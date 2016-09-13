var data = require('../data');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getCourseRecords(req,res,next)
{
    res.json(data.getCourseRecords(req.params.id));
}

function addCourseRecords(req,res,next)
{
    data.addCourseRecord(req.params.id, req.body.student, req.body.grade);
    res.sendStatus(200);
}

function updateCourseRecords(req,res,next){
    data.updateCourseRecord(req.params.id, req.body.student, req.body.grade);
    res.sendStatus(200);
}


//
// Declare routes
//

router.route('/records/course/:id')
    .get(getCourseRecords)
    .post(addCourseRecords)
    .put(updateCourseRecords);    

module.exports = router;