const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    userTweets: { type: String },
    image: { type: String, default: null },
    comments: [{
        text: {type: String},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        postedOn: { type: Date }
    }],
    postedOn: { type: Date}
});

module.exports = mongoose.model('tweet', tweetSchema);