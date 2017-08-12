var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   name: {type: String, requird: true},
    price: {type: String, required: true},
    address: {type: String, required: true},
    paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);

