'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // File Upload Routes
    var files = require('../../app/controllers/files_upload.server.controller');
    // Upload File
    app.route('/upload/').post(files.uploadFile);
};