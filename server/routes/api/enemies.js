const keystone = require('keystone');

const Enemies = keystone.list('Enemy');

exports.list = (req, res) => {
    Enemies.model.find((err, enemies) => {
        if (err) return res.apiError('database error', err);

        res.apiResponse(enemies);
    });
}