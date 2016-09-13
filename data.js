var shortid = require('shortid');

// Define some book data
var studentData = [{
                    id: 1,
                    name: "John Doe",
                    address: "Test Drive 1",
                    class: "1992"
                }];

var courseData = [{
                    id: 1,
                    name: "Heroku basics",
                    Description: "Heroku for real dummies",
                }];

var recordData = [{
                id: shortid.generate(),
                student: 1,
                course: 1,
                grade: 4
            }];          


function getTarget(type)
{
    if(type == "student")
    {
        return studentData;
    }
    else
    {
        return courseData;
    }
}

function getCourseAndStudentData(record)
{
    record.course = courseData.find(function(c){
        if(c.id == record.course)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    record.student = studentData.find(function(s){
        if(s.id == record.student)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
}

// Public functions for other modules to use
exports.getAllBD = function(type) 
{
    return getTarget(type);    
}

exports.addBD = function(type, data)
{
    data.id = shortid.generate();
    var target = getTarget(type);
    target.push(data);

    return data.id;
}

exports.getBD = function(type, id)
{
    var target = getTarget(type);
    return target.find(function(e){
        return e.id == id;
    });
}

exports.updateStudent = function(id, newData)
{    
    studentData.find(function(e){
        if(e.id === id)
        {
            e.name = newData.name;
            e.address = newData.address;
            e.class = newData.class;
            return true;
        }
        else
        {
            return false;
        }        
    });
}

exports.updateCourse = function(id, newData)
{    
    courseData.find(function(e){
        if(e.id === id)
        {
            e.name = newData.name;
            e.description = newData.description;            
            return true;
        }
        else
        {
            return false;
        }        
    });
}

exports.deleteBD = function(type,id)
{
    var target = getTarget(type);
    var delIndex = target.findIndex(function(s) {
         return s.id === id;
    });

    target.splice(delIndex, 1);
}

exports.getCourseRecords = function(courseId)
{
    var courseRecords = {
        course: courseData.find(function(c){
                    if(c.id == courseId)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }),
        grades: []
    };

    recordData.forEach(function(e) {
        if(e.course == courseId)
        {
            var student = studentData.find(function(s){
                                if(s.id == e.student)
                                {
                                    return true;
                                }
                                else
                                {
                                    return false;
                                }
                            })
            courseRecords.grades.push({ student: student,
                                        grade: e.grade 
                                      });
        }        
    });

    return courseRecords;
}

exports.addCourseRecord = function(courseId, studentId, grade)
{
    recordData.push({ id: shortid.generate(),
                student: studentId,
                course: courseId,
                grade: grade
            });
}

exports.updateCourseRecord = function(courseId, studentId, grade)
{
    recordData.find(function(r){
        if(r.course == courseId)
        {
            if(r.student == studentId)
            {
                r.grade = grade;
                return true;
            }            
        }
        
        return false;        
    })
}





