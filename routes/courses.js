var data = require('../data');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getCourses(req,res,next)
{
    res.json(data.getAllBD('course'));
}

function newCourse(req,res,next)
{
    data.addBD('course', req.body)
    res.sendStatus(201);
}

function getCourse(req,res,next)
{
    res.json(data.getBD('course', req.params.id));
}

function updateCourse(req,res,next)
{
    data.updateCourse(req.params.id, req.body)
    res.sendStatus(200);
}

function deleteCourse(req,res,next)
{
    data.deleteBD('course', req.params.id)
    res.sendStatus(200);
}

//
// Declare routes
//

router.route('/courses')
    .get(getCourses)
    .post(newCourse);    
    
router.route('/courses/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);    

module.exports = router;