// let mongojs =  require('mongojs');
// let bcrypt = require('bcryptjs');
// let db = mongojs(process.env.MLAB_URI, ['users']); // Replace with credentials from .env file
// let salt = bcrypt.genSaltSync(10);
// let errormsg;

// const userLogin = (formInput) => {
//     return new Promise((resolve, reject) => {
//         db.users.findOne({
//             email: formInput.email
//         }, (err, profile) => {
//             if (err) {
//                 reject(Error(err));
//             } else if (profile === null) {
//                 errormsg = "This email address has not been registered.";
//                 resolve(errormsg);
//             } else {
//                 if(bcrypt.compareSync(formInput.password, profile.password)) {
//                     resolve("User Succesfully logged in.");
//                 }
//                else resolve("Incorrect password.");
//             }
//         });
//     });
// };


// module.exports = {
//     userLogin: userLogin
// };