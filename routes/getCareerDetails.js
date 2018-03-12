var express = require('express');
var router = express.Router();
let jobDesc = require("../helpers/careerDetails/jobdesc");
let urls = ["summary/tasks", "summary/knowledge", "summary/skills", "summary/work_styles", "summary/related_occupations"];
/* GET home page. */
router.post('/', function (req, res, next) {
  let number = req.body.number;
  Promise.all([jobDesc.getJobDesc(number),
    jobDesc.getJobDesc(number, urls[0]),
    jobDesc.getJobDesc(number, urls[1]),
    jobDesc.getJobDesc(number, urls[2]),
    jobDesc.getJobDesc(number, urls[3]),
    jobDesc.getJobDesc(number, urls[4])
  ]).then((results) => {
    let description = results[0].description;
    let reportedJobTitles = results[0].sample_of_reported_job_titles.title;
    let tasks = results[1].task;
    let knowledge = results[2].element;
    let skills = results[3].element;
    let workStyles = results[4].element;
    let relatedOccupations = results[5].occupation;

    res.json({
      description: description,
      reportedJobTitles: reportedJobTitles,
      tasks: tasks,
      knowledge: knowledge,
      skills: skills,
      workStyles: workStyles,
      relatedOccupations: relatedOccupations
    });

  }).catch((err) => {
    res.json({
      message: "An error occured."
    });
  });
});

module.exports = router;