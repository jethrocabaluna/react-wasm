const keystone = require('keystone');
const Types = keystone.Field.Types;

const Enemies = keystone.list('Enemy');

const Level = new keystone.List('Level', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt'
});

const fields = {
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        hidden: true
    },
    levelNumber: {
        type: Types.Number,
        default: 1,
        required: true
    },
    description: {
        type: Types.Textarea,
        height: 300
    }
};

Enemies.model.find({}, (err, allEnemy) => {
    if (err) {
        console.log(err);
        return;
    }

    allEnemy.forEach(enemy => {
        fields[enemy.name] = {
            type: Types.Number,
            label: `Number of ${enemy.name}`
        };
    });

    Level.add(fields);

    Level.register();
});

Level.add(fields);

Level.register();
