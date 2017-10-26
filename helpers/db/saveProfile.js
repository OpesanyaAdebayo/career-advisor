var mongojs = require('mongojs');
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
var db = mongojs(process.env.MLAB_URI, ['users'])

const saveProfile = (profile) => {
    return new Promise((resolve, reject) => {
        db.users.save(profile, function (err, feedback) {
           if (err) {
            reject(Error(err));
           }
           else {
               resolve(feedback);
           }
        })
    })
}

module.exports = {
    saveProfile: saveProfile
}