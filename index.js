const keystone = require('keystone');

keystone.init({
    'name': 'Wasm React',
    'static': [
        './server/public/js/',
        './server/public/img/'
    ],
    'auto update': true,
    'mongo': 'mongodb://localhost/wasm_react',
    'auth': true,
    'user model': 'User',
    'cookie secret': 'SECRET'
});

keystone.import('./server/models');

keystone.set('routes', require('./server/routes'));

keystone.start();