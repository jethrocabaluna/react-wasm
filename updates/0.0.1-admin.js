const keystone = require('keystone');
const User = keystone.list('User');

exports = module.exports = done => {
    new User.model({
        name: { first: process.env.KEYSTONE_FIRSTNAME, last: process.env.KEYSTONELASTNAME },
        email: process.env.KEYSTONE_EMAIL,
        password: process.env.KEYSTONE_PASSWORD,
        canAccessKeystone: true
    }).save(done);
};