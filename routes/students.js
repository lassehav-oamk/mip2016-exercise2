var data = require('../data');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getStudents(req,res,next)
{
    res.json(data.getAllBD('student'));
}

function newStudent(req,res,next)
{
    var newId = data.addBD('student', req.body)
    res.json({ studentId: newId });
}

function getStudent(req,res,next)
{    
    res.json(data.getBD('student', req.params.id));
}

function updateStudent(req,res,next)
{
    data.updateStudent(req.params.id, req.body)
    res.sendStatus(200);
}

function deleteStudent(req,res,next)
{
    data.deleteBD('student', req.params.id)
    res.sendStatus(200);
}

//
// Declare routes
//

router.route('/students')
    .get(getStudents)
    .post(newStudent);    
    
router.route('/students/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);    

module.exports = router;