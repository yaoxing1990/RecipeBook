var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.post('/', function (req, res, next) {
    console.log(req.value);
    var stripe = require("stripe")("sk_test_OQEvgx7r0Pwy2RgmkZ89EEbY");
    stripe.charges.create({
        amount: req.body.price * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function (err, charge) {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var order = new Order({
            name: req.body.name,
            price: req.body.price,
            address: req.body.address,
            paymentId: charge.id
        });
        order.save(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Successfully bought product',
                obj: result
            });

        });
    });
});

module.exports = router;