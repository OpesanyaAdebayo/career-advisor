let request = require("request");

const getJobDesc = (number, url = "") => {
    return new Promise((resolve, reject) => {
        let options = {
            url: 'https://services.onetcenter.org/ws/online/occupation/' + number + "/" + url,
            headers: {
                'Authorization': 'Basic ' + process.env.ONET_AUTH_CREDENTIAL,
                'Accept': 'application/json'
            },
            json: true
        };

        request(options, (error, jobDesc) => {
            if(error) {
                reject(Error(error));
            }
            else {
                resolve(jobDesc.body);
            }
        });
    });
};


module.exports = {
    getJobDesc: getJobDesc
};