require("dotenv").config();
let PersonalityInsightsV3 =require('watson-developer-cloud/personality-insights/v3');
let personality_insights = new PersonalityInsightsV3({
    username: process.env.PERSONALITY_INSIGHTS_USERNAME,
    password: process.env.PERSONALITY_INSIGHTS_PASSWORD,
    version_date: '2017-10-13'
});

let PersonalityTextSummaries = require('personality-text-summary');
let v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

const getPersonality = (tweets) => {
    return new Promise((resolve, reject) => {
        let params = {
            // Content items are tweets.
            content_items: tweets,
            consumption_preferences: true,
            raw_scores: true,
            headers: {
                'accept-language': 'en',
                'accept': 'application/json'
            }
        };
        personality_insights.profile(params, function (error, personalityProfile) {
            if (error && error.code == 400){
                reject(Error("Ouch! You either do not have sufficient tweets, or your language is not supported. Sorry."));
            }
            else
                resolve(personalityProfile);
        });
    });

};

const getTextSummary = (personalityProfile) => {
    return new Promise((resolve,reject) => {
        let textSummary  = v3EnglishTextSummaries.getSummary(personalityProfile);
        if(typeof(textSummary) !== 'string') {
            reject(Error("Could not get summary."));
        }
        else  {
            resolve(textSummary);
        }
    });
};

module.exports = {
    getPersonality: getPersonality,
    getTextSummary: getTextSummary
};