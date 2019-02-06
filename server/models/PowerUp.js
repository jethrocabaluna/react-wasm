const keystone = require('keystone');
const Types = keystone.Field.Types;
const path = require('path');

const PowerUp = new keystone.List('PowerUp', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt'
});

PowerUp.add({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        hidden: true
    },
    color: {
        type: Types.Color
    },
    description: {
        type: Types.Textarea,
        height: 300
    },
    effect: {
        type: Types.Select,
        options: 'damage2x, speed2x, shield, +life, heal'
    }
});

PowerUp.register();