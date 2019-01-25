const keystone = require('keystone');
const Types = keystone.Field.Types;
const path = require('path');

const Image = new keystone.List('Image', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt'
});

const imageStoreage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('server/public/img'),
        generateFilename: function(file, index) {
            return file.originalname;
        },
        whenExists: 'error',
        publicPath: '/public/img'
    }
});

Image.add({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        hidden: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: Types.File,
        storage: imageStoreage,
        mimetype: '.jpeg, .jpg, .png'
    },
    description: {
        type: Types.Textarea,
        height: 300
    }
});

Image.defaultColumns = 'name, state|20%, author, publishedAt|15%';
Image.register();