let mongojs =  require('mongojs');
let bcrypt = require('bcryptjs');
let db = mongojs(process.env.MLAB_SESSION_URI, ['users']); // Replace with mlab credentials from .env file

// db.on('error', function (error) {
//     Promise.resolve();
// });

const processFormInput = (formInput) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({
            email: formInput.email
        }, (err, profile) => {
            if (err) {
                reject(Error(err));
            }
            else if (profile === null) {
                let salt = bcrypt.genSaltSync(10);
                formInput.password = bcrypt.hashSync(formInput.password, salt);
                db.users.save(formInput, (err, savedProfile) => {
                    if (err) {
                        reject(Error(err));
                    }
                    else {
                        resolve(savedProfile);
                    }
                });
            }
            else {
                reject(Error("Someone already registered with this email."));
            }
        });
    });
};


module.exports = {
    processFormInput: processFormInput
};