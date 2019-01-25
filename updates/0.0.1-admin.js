const keystone = require('keystone');
const User = keystone.list('User');

exports = module.exports = done => {
    new User.model({
        name: { first: 'Jethro', last: 'Cabaluna' },
        email: 'admin@admin.com',
        password: 'admin',
        canAccessKeystone: true
    }).save(done);
};