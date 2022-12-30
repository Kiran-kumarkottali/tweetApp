const jwtDecode = require('jwt-decode');
const Tweet = require('../models/tweet')
const util = require("../util");

//POST TWEET
module.exports.postTweet = async (req, res) => {
    const decodedToken = jwtDecode(req.cookies.jwt);
    console.log("ecodedToken=====",decodedToken)
    const {
        userId = decodedToken.id,
        userTweets,
        postedOn = Date.now(),
    } = req.body;

    try {
        const tweet = await Tweet.create({
            userId,
            userTweets,
            postedOn
        });
        res.status(201).json({
            tweet,
            msg: 'Tweet Posted successfully',
        });
    } catch (err) {
        const errors = util.handleLoanErrors(err);
        res.status(403).json({
            errors,
        });
    }
};

//GET ALL TWEETS
module.exports.getTweet = async (req, res) => {
    await Tweet.find({})
        .then((result) => {
            res.status(200).json({
                tweetData: result,
            });
        });
}

//GET SPECIFIC TWEET BY ID
module.exports.getTweetById = async (req, res) => {
    const decodedToken = jwtDecode(req.cookies.jwt);
    await Tweet.findById({
        _id: req.params.id
    })
        .then((result) => {
            res.status(200).json({
                tweetData: result,
            });
        });
}

//UPDATE SPECIFIC TWEET BY ID
module.exports.updateTweetById = async (req, res) => {
    await Tweet.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            userTweets: req.body.userTweets
        },
    })
        .then(() => {
            res.status(201).json({
                message: 'Tweet Updated Successfully',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                error: err,
            });
        });
}

//Commenting on a tweet
module.exports.commentTweet = async (req, res) => {
    const decodedToken = await jwtDecode(req.cookies.jwt);
    let search = {
        _id: req.body.id
    }
    let update = {
        $push: {
            "comments":  {
                text: req.body.text,
                user: decodedToken.id,
                postedOn: Date.now()
            }
        },
    }
    Tweet.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
    if(err) {
        res.status(400).json({
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        res.status(201).json({
            success: true,
            msg: "Successfully commented on the tweet" ,
            payload: result
        }) 
    }
    });
}

module.exports.deleteTweetById = async (req, res) => {
    await Tweet.findOneAndDelete({
        _id: req.params.id,
      })
        .then((result) => {
          if (result == null) {
            res.status(400).json({
              error: `Tweet with id:${req.params.id} does not exist`,
            });
          } else {
            res.status(200).json({
              message: 'Tweet deleted successfully',
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            error: err,
          });
        });
}

