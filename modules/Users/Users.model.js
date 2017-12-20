//modules/Users/Users.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var UsersSchema = new Schema({
    id: String,
    channel_free:{subscribe: Boolean,po:Number,},
    channel_pay: [{name:String, po: Number, subscribe: Boolean}]
    
    },{collection : 'Users'});


var Users = mongoose.model("Users",UsersSchema);

exports.addUsers = (body)=>{
    var UsersEntity = new Users(body);
    UsersEntity.save(function(error,doc) {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}

exports.random_free_Users = ()=>{
    return Users.find({}, function(err, Users) {
        if (err) throw err;
      
        // object of all the users
        console.log(Users);
      });
}

exports.list_Users = ()=>{
    return Users.find({}, function(err, Users) {
        if (err) throw err;
      
        // object of all the users
        console.log(Users);
      });
}

exports.subscribe_update = (body)=>{
    let userid = body.id;
    let subscribe = body.subscribe;
    function find_if(element,index,array,condition){
        if(element == condition){
            return true;
        }
    }
    var query = Users.findOne({id:userid},(err,doc)=>{
        //doc.channel_pay;
        if(err)console.log(err);
        for(var i = 0 ; i < doc.channel_pay.length; i++){
            if(subscribe.find(find_if(condition = doc.channel_pay[i].name) != undefined){   //represent it exist
                doc.channel_pay[i].subscribe = true;
                doc.channel_pay[i].po = 25;
            }else{
                doc.channel_pay[i].subscribe = false;
                doc.channel_free[i].po = 0;
            }
        }      

        doc.visits.$inc();
        doc.save();
    });
}

exports.who_subscribe_storeA = (storeA)=>{}