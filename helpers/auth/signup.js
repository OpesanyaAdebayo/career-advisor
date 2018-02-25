let mongojs =  require('mongojs');
let bcrypt = require('bcryptjs');
let db = mongojs('process.env.MLAB_URI', ['users'], { ssl: true }); // Replace with mlab credentials from .env file
let salt = bcrypt.genSaltSync(10);
let errormsg;

const processFormInput = (formInput) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({
            email: formInput.email
        }, (err, profile) => {
            if (err) {
                reject (Error(err));
            } else if (profile === null) {
                let password = bcrypt.hashSync(formInput.password, salt);
                formInput.password = password;
                db.users.save(formInput, function (err, savedProfile) {
                    resolve(savedProfile);
                });
            } else {
                errormsg = "Someone already registered with this email";
                resolve(errormsg);
            }
        });
    });
};


module.exports = {
    processFormInput: processFormInput
};