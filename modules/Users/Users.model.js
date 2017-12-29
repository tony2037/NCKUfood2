//modules/Users/Users.model.js

const mongoose = require('mongoose');

Schema = mongoose.Schema;  

var UsersSchema = new Schema({
    id: String,
    channel_free:{subscribe: Boolean,po:Number,},
    channel_pay: [{name:String, po: Number, subscribe: Boolean}]
    },{collection : 'Users'});

UsersSchema.statics.find_by_id = function(id, callback) {
    return this.findOne({id : id}, callback);
};

var Users = mongoose.model("Users",UsersSchema);

/*
UsersSchema.methods.findbyid = function(id, callback) {
    return this.model('Users').find({id: id}, callback);
}*/



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
    /*{id:pid , subscribe:[]} */
    let subscribe = body.subscribe;
    let userid = body.id;

    function subscribeFindByid(element,index,array){
        
    }
    var query = Users.findOne({id:userid},(err,doc)=>{
        //doc.channel_pay;
        if(err)console.log(err);

        if(doc == null){
            //new User
            var data = {
                id: String,
                channel_free:{subscribe: Boolean,po:Number,},
                channel_pay: [{name:String, po: Number, subscribe: Boolean}]
                };
            data.id = userid;
            data.channel_free.subscribe = subscribe[0].check;
            data.channel_free.po = 25;
            for(var i=1; i< subscribe.length; i++){
                data.channel_pay.name = subscribe[i].id;
                data.channel_pay.po = 25;
                data.channel_pay.subscribe = subscribe[i].check;
            }
            addUsers(data);

        }else{
            //change User's setting
            for(var i=0; i<subscribe.length; i++){
                //subscribe[i].id =>store name
                //subscribe[i].check
                for(var j=0; j<doc.channel_pay.length; j++){
                    if(doc.channel_pay[j].name == subscribe[i].id){
                        doc.channel_pay[j].subscribe = subscribe[i].check;
                    } //update
                }
            }
            doc.visits.$inc();
            doc.save();
        }
        
    });
}

exports.rending2 = (id)=>{
    //Give an id to find everything this user subscribe
    //return [{value:store_name,check:Boolean}]
    global.responds = [];
    global.if_exit = true;
    var result = {responds:[]};
    
    /*
    Users.findOne({id:id},(err,doc)=>{
        if(err)console.log(err);
        console.log('doc'+ doc);

        if(doc == null){
            global.if_exit = false;
        }else{
            global.responds.push({value:"free", check: doc.channel_free.subscribe});
            
            for(var i=0; i < doc.channel_pay.length; i++){
               
                global.responds.push({value:doc.channel_pay[i].name, check:doc.channel_pay[i].subscribe});
            }
        }
    });
    */

    var promise = Users.findOne({id:id}).exec();
    promise.then(function(User){
        if(User == null){
            global.if_exit = false;
        }else{
            global.responds.push({value:"free", check: User.channel_free.subscribe});

            for(var i=0; i < User.channel_pay.length; i++){
                global.responds.push({value:User.channel_pay[i].name, check:User.channel_pay[i].subscribe});
            }
        }
     }).error(function(error){
        console.log(error);
     });
        
      
     console.log("global.if_exit  " + global.if_exit);
     console.log("global.responds " + global.responds);
     if(global.if_exit == true){
         console.log('global.responds');
         return global.responds;
     }else{
         console.log('false');
         return false;
     }
       
            
            
     }

exports.rending = (id)=>{
    var responds = [];
    var exist = true;
    var result = Users.findOne({id:id});
    
    result.then((doc)=>{
        console.log(" doc : " + doc);
        if(doc == null){
            exist = false;
        }else{
            console.log(" doc : " + doc);
            responds.push({value:"free", check: doc.channel_free.subscribe});
            
            for(var i=0; i < doc.channel_pay.length; i++){
                  responds.push({value:doc.channel_pay[i].name, check:doc.channel_pay[i].subscribe});
            }
        }
    });

    var promise = result.exec();
    promise.then((doc)=>{})
    promise.exec();
    if(exist = false){
        return false;
    }else{
        return responds;
    }
}
    
    

exports.who_subscribe_storeA = (storeA)=>{
    Users.find({channel_pay:{$in:{name:storeA}}});
}

exports.findbyid = (id ,fn)=>{

    Users.find_by_id(id, function(err, doc){
        var exist = false;
        var responds = [];
        if(err)  console.log(err);
    
        if(doc == null){
           fn(exist, responds);
        }else{
            responds.push({value:"free", check: doc.channel_free.subscribe});
            
            for(var i=0; i < doc.channel_pay.length; i++){
                  responds.push({value:doc.channel_pay[i].name, check:doc.channel_pay[i].subscribe});
            }
            fn(exist, responds);
        }
    });

}                                                                                                                                                                                                           
exports.james = (id,fn)=>{
  Users.findOne({id:id},(err,doc)=>{
    var exist = false
    if(err)console.log(err)
    if(doc == null){
      fn(false)
    }else{
      
    }
    fn(exist)
 })
}
