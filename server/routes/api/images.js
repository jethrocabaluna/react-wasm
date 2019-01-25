const keystone = require('keystone');

const Images = keystone.list('Image');

exports.list = (req, res) => {
    Images.model.find((err, images) => {
        if (err) return res.apiError('database error', err);

        res.apiResponse(images);
    });
}