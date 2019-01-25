const keystone = require('keystone');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const importRoutes = keystone.importer(__dirname);

const routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
}

exports = module.exports = app => {
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.get('/api/images/list', keystone.middleware.api, routes.api.images.list);

    app.get('*', routes.views.index);
}