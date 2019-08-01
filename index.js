const keystone = require('keystone');
require('dotenv').config();

keystone.init({
    'name': 'React Game',
    'static': [
        './server/public/js/',
        './server/public/img/'
    ],
    'auto update': true,
    'mongo': process.env.MONGODB_URI,
    'auth': true,
    'user model': 'User',
    'cookie secret': process.env.MONGODB_SECRETKEY
});

keystone.import('./server/models');

keystone.set('routes', require('./server/routes'));

keystone.start();