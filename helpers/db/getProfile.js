let mongojs =  require('mongojs');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
let db = mongojs(process.env.MLAB_URI, ['users']);

const getProfile = (UID) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({_id:mongojs.ObjectId(UID)}, function(err, profile){
            if(err) {
                reject(Error(err));
            }
            else {
                resolve(profile);
            }
        });
    });
};

module.exports = {
    getProfile: getProfile
};