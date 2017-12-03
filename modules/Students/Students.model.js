//modules/Students/Students.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var StudentsSchema = new Schema({
    id: String,
    food_name: String,
    foode_number: String,
    deadline: String,
    location: String,
    image_url: String
    },{collection : 'Students'});


var Students = mongoose.model("Students",StudentsSchema);
