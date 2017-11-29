//modules/Users/Users.model.js



const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var UsersSchema = new Schema({
    id: String,
    channel_free:{subscribe: Boolean,po:Number,},
    channel_pay: [{name:String, po: Number, subscribe: Boolean}]
    
    });


var Users = mongoose.model("Users",UsersSchema);
