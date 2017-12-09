//modules/Students/Students.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var StudentsSchema = new Schema({
    id: String,
    food_name: String,
    food_number: String,
    deadline: String,
    location: String,
    image_url: String
    },{collection : 'Students'});


var Students = mongoose.model("Students",StudentsSchema);

exports.addStudents = (body)=>{
    var StudentsEntity = new Students(body);
    StudentsEntity.save(function(error,doc) {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}

exports.list_Students = ()=>{
    return Students.find({}, function(err, Students) {
        if (err) throw err;
      
        // object of all the users
        console.log(Students);
      });
}