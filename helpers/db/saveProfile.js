var mongojs = require('mongojs');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
var db = mongojs(process.env.MLAB_URI, ['users']);

const saveProfile = (profile, UID) => {
    return new Promise((resolve, reject) => {
        db.users.findAndModify({
            query: {
                _id: mongojs.ObjectId(UID)
            },
            update: {
                $set: {
                    personality_profile: profile
                }
            },
            new: true
        }, function (err, profile, lastErrorObject) {
            console.log(lastErrorObject);
            resolve(profile);
        });
    });
};

const saveSummary = (summary, UID) => {
    return new Promise((resolve, reject) => {
        db.users.findAndModify({
            query: {
                _id: mongojs.ObjectId(UID)
            },
            update: {
                $set: {
                    summary: summary
                }
            },
            new: true
        }, function (err, profile, lastErrorObject) {
            console.log(lastErrorObject);
            resolve(profile);
        });
    });
};

module.exports = {
    saveProfile: saveProfile,
    saveSummary: saveSummary
};