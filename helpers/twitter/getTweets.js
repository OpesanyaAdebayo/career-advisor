require('dotenv').config();
let Twitter = require('twitter');
let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// This is for error handling
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

const processTweets = (username) => {
    let params = {
        screen_name: username,
        count: 200,
        include_rts: false,
        trim_user: true,
        exclude_replies: true
    };
    return new Promise ((resolve, reject) => {
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                filteredTweets = tweets.map(function (tweet) {
                    return {
                        id: tweet.id_str,
                        language: tweet.lang,
                        contenttype: 'text/plain',
                        content: tweet.text.replace('[^(\\x20-\\x7F)]*', ''),
                        created: Date.parse(tweet.created_at),
                        reply: tweet.in_reply_to_screen_name != null
                    };
                });
                // console.log(filteredTweets.length);
                resolve(filteredTweets)
            } else {
                reject(Error(error)) ;
            }
        });
    })

}

// processTweets("onejsninja");

module.exports = {
    processTweets: processTweets
};