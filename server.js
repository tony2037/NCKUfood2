'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
  app.listen(process.env.PORT || 17487,()=>console.log('app is running on port 17487!'));
var fb = require('./fb');



app.post('/webhook',(req, res)=>{
  console.log("get post");
  let body = req.body;
  if(body.object === 'page'){
    body.entry.forEach(function(entry){
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
    // console.log(webhook_event);
     console.log('sender psid:'+ sender_psid );
      if(webhook_event.message){
        fb.handleMessage(sender_psid, webhook_event.message);
      }else if(webhook_event.postback){
        fb.handlePostback(sender_psid, webhook_event.postback);
      }
    });
  
   res.status(200).send('EVENT_RECEIVED');
  }else{
    res.sendStatus(404);
  }


});
app.get('/webhook',(req,res)=>{
  let VERIFY_TOKEN = "aaabbb";

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if(mode&& token){
    if(mode==='subscribe' && token === VERIFY_TOKEN){
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    }else{
      res.sendStatus(403);
    }
  }
});










