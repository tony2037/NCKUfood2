var mongoose = require('mongoose');
var Admin = mongoose.mongo.Admin;
const connection = mongoose.createConnection('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');

var Schema = mongoose.Schema;
var UsersSchema = new Schema({
    id: String,
    channel_free:{subscibe: Boolean,po:Number,},
    channel_pay: [{name:String, po: Number, subscribe: Boolean}]
});


var Users = mongoose.model("Users",UsersSchema);

connection.on('open', ()=>{
    new Admin(connection.db).listDatabases((err, result)=>{
        console.log('listDatabases succeeded');

        console.log(result);
    });
});


