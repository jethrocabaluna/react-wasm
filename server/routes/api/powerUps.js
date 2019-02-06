const keystone = require('keystone');

const PowerUps = keystone.list('PowerUp');

exports.list = (req, res) => {
    PowerUps.model.find((err, powerUps) => {
        if (err) return res.apiError('database error', err);

        res.apiResponse(powerUps);
    });
}