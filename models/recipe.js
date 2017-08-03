var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    ingredients: {type: [], required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (recipe) {
    User.findById(recipe.user, function (err, user) {
        user.recipes.pull(recipe);
        user.save();
    });
});

module.exports = mongoose.model('Recipe', schema);