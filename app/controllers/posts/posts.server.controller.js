'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post');


/**
 * Add new posts
 */

exports.newPost = function (req, res) {
    var user = req.user;
    if (true) {
        delete req.body.roles;
        var post = new Post(req.body);
        post.author = user.id;
        
        post.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                return res.status(500).send({
                    message: 'New post added!', 
                    post:post
                });
            }
        });
    } else {
        console.log('Error! Can not add new post');
        return res.status(400).send();
    }
};

/**
 * Get all posts
 */
exports.allPosts = function (req, res) {
    return Post.find(function (err, posts) {
        if (!err) {
            return res.send(posts);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
};

/**
 * Get  one posts by ID 
 */

exports.getPost = function (req, res) {
    console.log(req.params.id);
    return Post.findById(req.params.id, function (err, post) {
        if (!post) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', post:post });
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
};
