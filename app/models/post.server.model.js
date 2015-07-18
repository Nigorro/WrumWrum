'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var PostSchema = new Schema({
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    author: {
        type: String,
    },
    description:  {
        type: String,
        required: true
    },
    carNumber: {
        type: String
    },
    image: {},
    date: {
        type: Date,
        default: Date.now
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
    },
    votes: [],
    asshole: {},
});

PostSchema.methods.getAuthor = function () {
    return this.model('User').findById(this.author).exec();
};
// .findById(req.params.id)
//     .populate('author')
//     .exec(function(err, post) {
//         if (err) {
//             return res.status(500).send({
//                 error: 'Server error'
//             });
//         }
//         // post.author contains the content of your author document
//         return res.send(post);
//     });
mongoose.model('Post', PostSchema);