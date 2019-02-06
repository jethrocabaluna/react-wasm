const keystone = require('keystone');
const Types = keystone.Field.Types;
const path = require('path');

const Enemy = new keystone.List('Enemy', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt'
});

const imageStoreage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('server/public/img/enemies'),
        generateFilename: function(file, index) {
            return file.originalname;
        },
        whenExists: 'error',
        publicPath: '/public/img/enemies'
    }
});

Enemy.add({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        hidden: true
    },
    image: {
        type: Types.File,
        storage: imageStoreage,
        mimetype: '.jpeg, .jpg, .png'
    },
    description: {
        type: Types.Textarea,
        height: 300
    },
    health: {
        type: Types.Number,
        required: true,
        default: 10
    },
    damage: {
        type: Types.Number,
        required: true,
        default: 1
    },
    speed: {
        type: Types.Number,
        required: true,
        default: 1
    }
});

Enemy.register();