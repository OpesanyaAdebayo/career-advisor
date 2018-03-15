# Career Advisor
An application that gives career recommendations based on personality insights drawn from Twitter.

## Getting Started

1. You need to have Node.js installed. You can download and install Node.js [here](http://nodejs.org/)

2. You need an IBM Cloud account. If you don't have one, [signup](https://www.ibm.com/cloud/). Experimental Watson Services are free to use.

3. Create a Watson Personality Insights service. Be sure to copy out the service credentials. You'll need them soon.

4. You need an O*NET Web Services account. If you don't have one, [signup](https://services.onetcenter.org/developer/signup). Copy out the HTTP header authorization credential. Do not copy the authorization type.


5. You need to have a Twitter application. If you don't have one visit [here](https://apps.twitter.com/) to create one and also copy out the application credentials.

6. You need a hosted Mongodb database. If you have none, visit [Mlab](http://mlab.com/) to create an account and a database. Copy out your database uri.

7. Create a `.env` file in the root directory. The `.env` file will look something like the following:

  ```none
    TWITTER_CONSUMER_KEY = <Twitter Consumer Key>
    TWITTER_CONSUMER_SECRET = <Twitter Consumer Secret>
    TWITTER_ACCESS_TOKEN = <Twitter Access Token>
    TWITTER_ACCESS_TOKEN_SECRET = <Twitter Access Token Secret>
    PERSONALITY_INSIGHTS_USERNAME = <Personality Insights Service username>
    PERSONALITY_INSIGHTS_PASSWORD = <Personality Insights Service password>
    MLAB_URI = <Mlab database URI>
    ONET_AUTH_CREDENTIAL = <O*NET Auuthorization credential>
  ```

8. Install the application dependencies you need:

  ```none
  npm install
  ```

9. Start the application locally:

  ```none
  npm start
  ```

10. Point your browser to [http://localhost:3000](http://localhost:3000).