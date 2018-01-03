// db/connect.js
//Use   
//const db = require("./db/connect")
//db.start()
const mongoose = require('mongoose');
const dbConfig = require("../db.config");

exports.start = (success) => {
    mongoose.connect(dbConfig.dbConfig);
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
