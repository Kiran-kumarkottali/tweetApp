const { Router } = require("express");
const tweetController = require("../controller/tweetController");
const { requireAuth } = require('../middleware/auth');
const router = Router();

router.post('/api/v1/tweetapp/tweets',requireAuth,tweetController.postTweet);
router.post('/api/v1/tweetapp/tweets/comment',requireAuth,tweetController.commentTweet);
router.get('/api/v1/tweetapp/tweets',requireAuth,tweetController.getTweet);
router.get('/api/v1/tweetapp/tweets/:id',requireAuth,tweetController.getTweetById);
router.put('/api/v1/tweetapp/tweets/:id',requireAuth,tweetController.updateTweetById);
router.delete('/api/v1/tweetapp/tweets/:id',requireAuth,tweetController.deleteTweetById)

module.exports = router;