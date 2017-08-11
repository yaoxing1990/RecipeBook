var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   name: {type: String, required: true},
   price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);