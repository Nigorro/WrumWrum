'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};


/**
 * find User
 */
exports.findUser = function(req, res, next) {
    console.log(req.query.userId);
    var id = req.query.userId;
    User.findOne({
        _id: id
    },{ 
        'password':0,
        'roles': 0, 
        'resetPasswordToken': 0, 
        'resetPasswordExpires': 0,
        'provider': 0}).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        return res.send({ status: 'OK', user:user });
    });
};
/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
    var _this = this;

    return function(req, res, next) {
        _this.requiresLogin(req, res, function() {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};
