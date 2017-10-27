var mongojs = require('mongojs');
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
var db = mongojs(process.env.MLAB_URI, ['users'])

const saveToProfile = (handle, UID) => {
    return new Promise((resolve, reject) => {
        db.users.findAndModify({
            query: {
                _id: mongojs.ObjectId(UID)
            },
            update: {
                $set: {
                    twitterHandle: handle
                }
            },
            new: true
        }, function (err, profile, lastErrorObject) {
            if (!err) {
                resolve(lastErrorObject)
            } else {
                reject(Error(err));
            }
        })
    })
}

module.exports = {
    saveToProfile: saveToProfile
}