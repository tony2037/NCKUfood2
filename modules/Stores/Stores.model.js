//modules/Stores/Stores.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var StoresSchema = new Schema({
    shop_name: String,
    food_name: String,
    food_number: String,
    deadline: String,
    location: String,
    time_hr: String,
    time_min: String,
    normal_price: String,
    special_price: String,
    image_url: String
    },{collection : 'Stores'});


var Stores = mongoose.model("Stores",StoresSchema);

exports.addStores = (body)=>{
    var StoresEntity = new Stores(body);
    StoresEntity.save(function(error,doc) {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}

exports.list_Stores = ()=>{
    return Stores.find({}, function(err, Stores) {
        if (err) throw err;
      
        // object of all the users
        console.log(Stores);
      });
}