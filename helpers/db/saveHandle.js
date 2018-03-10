let mongojs =  require('mongojs');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
let db = mongojs(process.env.MLAB_URI, ['users']);

const saveToProfile = (twitterProfile, UID) => {
    return new Promise((resolve, reject) => {
        db.users.findAndModify({
            query: {
                _id: mongojs.ObjectId(UID)
            },
            update: {
                $set: {
                    twitterId: twitterProfile.id_str,
                    twitterHandle: twitterProfile.screen_name,
                    location: twitterProfile.location,
                    imageUrl: twitterProfile.profile_image_url_https
                }
            },
            new: true
        }, function (err, profile, lastErrorObject) {
            if (!err) {
                resolve(profile);
            } else {
                reject(Error(err));
            }
        });
    });
};

module.exports = {
    saveToProfile: saveToProfile
};