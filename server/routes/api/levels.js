const keystone = require('keystone');
const Levels = keystone.list('Level');

exports.list = (req, res) => {
    Levels.model.find((err, levels) => {
        if (err) return res.apiError('database error', err);

        res.apiResponse(levels);
    });
}