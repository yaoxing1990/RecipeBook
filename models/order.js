var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   user: {type: Schema.Types.ObjectId, ref: 'User'},
   product: {type: Schema.Types.ObjectId, ref: 'Product'},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model('Order', schema);

