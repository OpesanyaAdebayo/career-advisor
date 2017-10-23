var mongojs = require('mongojs');
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
var db = mongojs('careeradvisor:careeradvisor@ds229465.mlab.com:29465/careeradvisor', ['careeradvisor'])

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