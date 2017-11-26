var mongoose = require('mongoose');
<<<<<<< HEAD
const connection = mongoose.connect('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log("We're connected!");
});
var Schema = mongoose.Schema;
var UsersSchema = new Schema({
    id: String,
    channel_free:{subscribe: Boolean,po:Number,},
    channel_pay: [{name:String, po: Number, subscribe: Boolean}]
});


var Users = mongoose.model("Users",UsersSchema);

function Create_collection_Users(){
    Users.create({category: 1, title: "Users"},(err, doc)=>{
        if(err)console.log(err);
    });
}

function Subscribe(User_ID= "",subscribe){
    if(User_ID == "")console.loge("id error");

    //check if subscribed

    //insert
    if(subscribe == "free"){
        var UsersObj = new Users({
            id : User_ID,
            channel_free:{subscribe:true,po: 0.25}
        });
        UsersObj.save((err)=>{console.log(err)});
        
    }
    else{}
}

=======
mongoose.connect('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');
var db_connection = mongoose.connection;
    // if not connected
db_connection.on('error', console.error.bind(console, 'connection error:'));
db_connection.once('open', function() {
    // if connected
    var MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
});
>>>>>>> 0c0c48e46482a36240c3523d2487a4ed1dc45c27
