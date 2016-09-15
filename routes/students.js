var models = require('../models');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getStudents(req,res,next)
{    
    models.Student.findAll().then(function(s) {
        res.json(s);
    }); 
    
}

function newStudent(req,res,next)
{    
    models.Student.create({
        name: req.body.name,
        address: req.body.address,
        class: req.body.class
    }).then(function(i) {
        res.json({
            id: i.dataValues.id
        });        
    });
}

function getStudent(req,res,next)
{            
    models.Student.findById(req.params.id).then(function(s) {
        res.json(s);
    });
}

function updateStudent(req,res,next)
{    
    models.Student.update({
        name: req.body.name,
        address: req.body.address,
        class: req.body.class
    },
    {
        where: {
            id: req.params.id
        }
    }).then(function(r){
        if(r.length > 0)
        {
            res.sendStatus(200);
        }
        else
        {
            res.sendStatus(404);
        }
    });
}

function deleteStudent(req,res,next)
{    
    models.Student.destroy({
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

router.route('/students')
    .get(getStudents)
    .post(newStudent);    
    
router.route('/students/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);    

module.exports = router;