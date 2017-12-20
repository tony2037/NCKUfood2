//modules/Users/Users.model.js

const mongoose = require('mongoose');

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
    //[{id:store_name,check:Boolean}]
    let subscribe = body.subscribe;
    let userid = body.id;

    function find_if(element,index,array,condition){
        if(element == condition){
            return true;
        }
    }
    var query = Users.findOne({id:userid},(err,doc)=>{
        //doc.channel_pay;
        if(err)console.log(err);

        if(doc == null){
            //new User

        }else{
            //change User's setting
            
        }
        for(var i = 0 ; i < doc.channel_pay.length; i++){
            if(subscribe.find(find_if(condition = doc.channel_pay[i].name) != undefined)){   //represent it exist
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

exports.rending = (id)=>{
    //Give an id to find everything this user subscribe
    //return [{value:store_name,check:Boolean}]
    var responds = []
    Users.findOne({id:id},(err,doc)=>{
        if(err)console.log(err);
        if(doc.channel_free.subscribe == true){
            responds.push({value:'free',check:true});
        }else{
            responds.push({value:'free',check:false});
        }

        for(var i=0; i < doc.channel_pay.length; i++){
            if(doc.channel_pay[i].subscribe == true){
                responds.push({value:doc.channel_pay[i].name, check:true});
            }else{
                responds.push({value:doc.channel_pay[i].name, check:false});
            }
        }

        if(doc == null){
            return false;
        }
    });

    return responds;
}

exports.who_subscribe_storeA = (storeA)=>{}
