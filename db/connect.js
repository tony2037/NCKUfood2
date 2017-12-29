// db/connect.js
//Use   
//const db = require("./db/connect")
//db.start()
const mongoose = require('mongoose');

exports.start = (success) => {
    mongoose.connect('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');
    const db = mongoose.connection;
    db.on('error',console.error.bind(console, 'connection error:'));
    db.once('open', ()=>{
        //we R connected
        console.log("connected db : wp2017_groupk");
        if(success){
            success();
        }
    });
};
