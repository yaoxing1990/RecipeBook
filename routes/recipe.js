var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Recipe = require('../models/recipe');

router.get('/', function (req, res, next) {
    Recipe.find()
        .populate('user', 'firstName')
        .exec(function (err, recipes) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: recipes
            })
        });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if(err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        // var recipes = [];
        // for(var recipe in req.body.obj) {
        //     recipes.add(new Recipe({
        //         name: recipe.name,
        //         description: recipe.description,
        //         imagePath: recipe.imagePath,
        //         ingredients: recipe.ingredients,
        //         user: user
        //     }));
        // }

        var recipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            imagePath: req.body.imagePath,
            ingredients: req.body.ingredients,
            user: user
        });

        recipe.save(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.recipes.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Recipe.findById(req.params.id, function (err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No recipe Found!',
                error: {message: 'Message not found'}
            });
        }
        if(recipe.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.imagePath = req.body.imagePath;
        recipe.ingredients = req.body.ingredients;
        recipe.save(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Recipe.findById(req.params.id, function (err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(recipe != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        recipe.remove(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
})

module.exports = router;