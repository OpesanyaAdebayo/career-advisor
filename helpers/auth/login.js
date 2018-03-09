let mongojs = require('mongojs');
let bcrypt = require('bcryptjs');
let db = mongojs(process.env.MLAB_URI, ['users']); // Replace with credentials from .env file
let salt = bcrypt.genSaltSync(10);

const processFormInput = (formInput) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({
            email: formInput.email
        }, (err, profile) => {
            if (err) {
                reject(Error(err));
            }
            else if (profile === null) {
                reject(Error("unregistered email."));
            }
            else if (profile !== null && !bcrypt.compareSync(formInput.password, profile.password)) {
                reject(Error("incorrect password."));
            }
            else {
                resolve(profile);
            }

        });
    });
};


module.exports = {
    processFormInput: processFormInput
};