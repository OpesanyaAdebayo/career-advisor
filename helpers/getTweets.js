let Twitter = require('twitter');
let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const processTweets = (username) => {
    return new Promise((resolve, reject) => {
        let params = {
            screen_name: username,
            count: 200,
            include_rts: false,
            trim_user: true,
            exclude_replies: true
        }
        let tweets = [];
        const fetchTweets = (error, newTweets) => {
            if (error) {
                return reject(Error(error));
            }
            filteredTweets = newTweets.map(function (tweet) {
                return {
                    id: tweet.id_str,
                    language: tweet.lang,
                    contenttype: 'text/plain',
                    content: tweet.text.replace('[^(\\x20-\\x7F)]*', ''),
                    created: Date.parse(tweet.created_at),
                    reply: tweet.in_reply_to_screen_name != null
                };
            });
            if (newTweets.length > 1) {
                tweets = tweets.concat(filteredTweets);
                params.max_id = tweets[tweets.length - 1].id - 1;
                client.get('statuses/user_timeline', params, fetchTweets)
            } else {
                console.log(tweets.length);
                resolve(tweets);
            }
        };
        client.get('statuses/user_timeline', params, fetchTweets);
    });
}

module.exports = {
    processTweets: processTweets
};