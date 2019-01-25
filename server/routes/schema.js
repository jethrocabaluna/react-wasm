const fetch = require('node-fetch');
const {
    GraphQLObjectType,
    GraphQLString,
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        images: {
            type: new GraphQLList(ImageType),
            resolve(parent, args) {
                return fetch('http://localhost:3000/api/images/list')
                    .then(res => res.json())
                    .then(data => data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
