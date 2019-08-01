const fetch = require('node-fetch');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema } = require('graphql');
const GraphQLJSON = require('graphql-type-json');

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        name: { type: GraphQLString },
        image: { type: GraphQLJSON },
        description: { type: GraphQLString },
        color: { type: GraphQLString },
    })
});

const EnemyType = new GraphQLObjectType({
    name: 'Enemy',
    fields: () => ({
        name: { type: GraphQLString },
        image: { type: GraphQLJSON },
        description: { type: GraphQLString },
        health: { type: GraphQLInt },
        damage: { type: GraphQLInt },
        speed: { type: GraphQLInt },
    })
});

const PowerUpType = new GraphQLObjectType({
    name: 'PowerUp',
    fields: () => ({
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        color: { type: GraphQLString },
        effect: { type: GraphQLString }
    })
});

const LevelType = new GraphQLObjectType({
    name: 'Level',
    fields: () => ({
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        levelNumber: { type: GraphQLInt },
        noob: { type: GraphQLInt },
        spaceship: { type: GraphQLInt },
        thanos: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        images: {
            type: new GraphQLList(ImageType),
            resolve(parent, args) {
                return fetch(`${process.env.BASE_URL}/api/images/list`)
                    .then(res => res.json())
                    .then(data => data);
            }
        },
        enemies: {
            type: new GraphQLList(EnemyType),
            resolve(parent, args) {
                return fetch(`${process.env.BASE_URL}/api/enemies/list`)
                    .then(res => res.json())
                    .then(data => data);
            }
        },
        powerUps: {
            type: new GraphQLList(PowerUpType),
            resolve(parent, args) {
                return fetch(`${process.env.BASE_URL}/api/powerUps/list`)
                    .then(res => res.json())
                    .then(data => data);
            }
        },
        levels: {
            type: new GraphQLList(LevelType),
            resolve(parent, args) {
                return fetch(`${process.env.BASE_URL}/api/levels/list`)
                    .then(res => res.json())
                    .then(data => data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
