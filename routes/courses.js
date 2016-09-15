var models = require('../models');
var express = require('express');
var router = express.Router();

//
// implement functionality
//

function getCourses(req,res,next)
{    
    models.Course.findAll().then(function (c){
        res.json(c);
    });
}

function newCourse(req,res,next)
{    
    models.Course.create({
        name: req.body.name,
        description: req.body.description        
    }).then(function(c) {
        res.json({
            id: c.dataValues.id
        });        
    });    
}

function getCourse(req,res,next)
{
    models.Course.findById(req.params.id).then(function(c){
        res.json(c);
    });
    
}

function updateCourse(req,res,next)
{    
    models.Course.update({
        name: req.body.name,
        description: req.body.description        
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
    })    
}

function deleteCourse(req,res,next)
{
     models.Course.destroy({
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

router.route('/courses')
    .get(getCourses)
    .post(newCourse);    
    
router.route('/courses/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);    

module.exports = router;