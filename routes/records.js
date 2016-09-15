var models = require('../models');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getAllRecords(req,res,next)
{
    models.Record.findAll().then(function(r){
        res.json(r);
    });
}

function getCourseRecords(req,res,next)
{
    models.Course.findById(req.params.id).then(function(c){
        c.getRecords().then(function(r){
            res.json(r);
        });
    });
}

function addCourseRecords(req,res,next)
{
    var queries = [
        models.Student.findById(req.body.studentId),
        models.Course.findById(req.params.id),
        models.Record.create({grade: req.body.grade})
    ];

    Promise.all(queries).then(function(results){
        var record = results[2];
        Promise.all([
            record.setStudent(results[0]),
            record.setCourse(results[1])
        ]).then(function(s){
            res.sendStatus(200);
        })                        
    });   
}

function deleteRecord(req,res,next)
{
    models.Record.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (r){
        if(r > 0)
        {
            res.sendStatus(200);
        }
        else
        {
            res.sendStatus(404);
        }
    });
}


//
// Declare routes
//
router.route('/records')
    .get(getAllRecords);

router.route('/records/:id')
    .delete(deleteRecord);

router.route('/records/course/:id')
    .get(getCourseRecords)
    .post(addCourseRecords);

module.exports = router;