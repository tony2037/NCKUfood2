'use strict';
const
  
  https = require('https'),
  fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
 // app.listen(process.env.PORT || 17487,()=>console.log('app is running on port 17487!'));
var fb = require('./fb');
var func = require('./modules/Users/function.js')
var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger(fb.page_token)


var privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
var ca = fs.readFileSync(__dirname + '/ssl/ca_bundle.crt');
var credentials = { key: privateKey, cert: certificate, ca: ca };
const db = require('./db/connect');
db.start();




https.createServer(credentials, app).listen(17487, function () {
    console.log('Https server listening on port ' + 17487);
    });

app.get('/ncku',(req,res)=>{
  var id = req.body.id;
  func.selected_people(food_num, multi_rate, ori_candidate_people, candidate_probability)
  messenger.sendTextMessage('1493495980699051', 'Hello')
  console.log(req.query);
});

app.get('/about',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
  });

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










