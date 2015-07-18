'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // User Routes
    var posts = require('../../app/controllers/posts.server.controller');
    // New post
    app.route('/posts/newpost/').post(posts.newPost);

    //Get All posts
    app.route('/posts/').get(posts.allPosts);

    //Get One  post by ID 
    app.route('/posts/:id').get(posts.getPost);
};