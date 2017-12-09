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

var EVENTS = []

var privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
var ca = fs.readFileSync(__dirname + '/ssl/ca_bundle.crt');
var credentials = { key: privateKey, cert: certificate, ca: ca };
const db = require('./db/connect');
db.start();

const STU = require('./modules/Students/Students.model');



https.createServer(credentials, app).listen(17487, function () {
    console.log('Https server listening on port ' + 17487);
    });

var food;//暫時的  發完食物
app.get('/nckufood_student',(req,res)=>{
  

  res.end('{"status":"success"}'); 
  var ajaxdata = req.query;
  var food_num = 1;
  var multi_rate =3;
  var ori_candidate_people = ["1493495980699051","1522796911138184","1485510774829902"];
  var candidate_probability = [0.5,0.5];
 
  var selectedPeople = func.selected_people(food_num, multi_rate, ori_candidate_people, candidate_probability)
  var myloveobj = {
      id: ajaxdata.id,
      selectedPeople : selectedPeople
   };
  var json = JSON.stringify(myloveobj);
  fs.writeFile('log.json', json, 'utf8');
 // food = ajaxdata.food_name;//暫時的 發完食物

  STU.addStudents({
    id:ajaxdata.id,
    food_name:ajaxdata.food_name,
    food_number:ajaxdata.food_number,
    deadline:ajaxdata.deadline,
    location:ajaxdata.location,
    image_url:ajaxdata.image_url
  });
  STU.list_Students();

  /////Create an event
  /*
  var ev = require('./event/event');
  ev.event({
    id:ajaxdata.id,
    food_name:ajaxdata.food_name,
    food_number:ajaxdata.food_number,
    deadline:ajaxdata.deadline,
    location:ajaxdata.location,
    image_url:ajaxdata.image_url
  });

  EVENTS.push(ev);
  for(var i = 0; i < EVENTS.length(); i++){
   console.log('EVENT' + i);
   console.log(EVENTS[i]);
  }
*/
////Create an event
var payload_yes = "yes&"+ajaxdata.id;
var payload_no = "no&"+ajaxdata.id;
var sendfood ={
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "generic",
            "elements":[{
              "title":"【食物快遞】現在有人贈送免費的" + ajaxdata.food_name + "是否去拿?",
              "subtitle":"食物數量:"+ ajaxdata.food_number + "\n地址:"+ ajaxdata.location + "\n請在" + ajaxdata.deadline +"前小時來拿",
              "image_url": ajaxdata.image_url,
              "buttons":[
                {
                  "type":"postback",
                  "title":"我想要",
                  "payload": payload_yes,
                },
                {
                  "type":"postback",
                  "title":"我不要",
                  "payload": payload_no,
                }
              ],
            }]
          }
        }
      }  
  var tossfooder ={
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "button",
            "text":"如果食物順利發完，或者不想發了，請記得按【發完了】，謝謝！",
            "buttons":[
                {
                  "type":"postback",
                  "title":"發完了",
                  "payload": "empty&"+ajaxdata.food_name,
                }
              ],
          }
        }
      }
      console.log('myloveobj');
      console.log(myloveobj.id);
  for(var i=0;i < myloveobj.selectedPeople.length;i++){
    fb.handleMessage(myloveobj.selectedPeople[i],"",sendfood);
  console.log("發食物給"+ myloveobj.selectedPeople[i]+"囉");
     // messenger.sendTextMessage(myloveobj.selectedPeople[i], '沒了');
 }
  
    fb.handleMessage(myloveobj.id,"",tossfooder);
  console.log(req.query);
});
/*--webpage--*/
app.get('/web_student',function(req,res){
  res.sendFile(__dirname + '/public/nckufood_student.html');
  });
app.get('/web_shop',function(req,res){
  res.sendFile(__dirname + '/public/nckufood_shop.html');
  });
app.get('/css/nckufood_student.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/nckufood_student.css");
  });

app.get('/css/nckufood_shop.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/nckufood_shop.css");
  });
app.get('/js/imgur.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/imgur.js");
  });
app.get('/js/nckufood_student.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/nckufood_student.js");
  });
app.get('/js/nckufood_shop.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/nckufood_shop.js");
  });
app.get('/css/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/style.css");
  });
app.get('/css/mobile-style.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/mobile-style.css");
  });
app.get('/css/loading-spin.svg', function(req, res) {
  res.sendFile(__dirname + "/public/css/loading-spin.svg");
  });
/*--webpage--*/


app.post('/webhook',(req, res)=>{
  console.log("get post");
  let body = req.body;
  if(body.object === 'page'){
    body.entry.forEach(function(entry){
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
    // console.log(webhook_event);
     console.log('sender psid:'+ sender_psid );
    
      if(webhook_event.postback){ 
        var get = webhook_event.postback.payload.split("&");
        if( get[0]=== "empty"){
         //這邊之後讀JSON檔??
         messenger.sendTextMessage('1493495980699051',sender_psid+ "說:"+ get[1] + '已經發完了唷');
         messenger.sendTextMessage('1522796911138184',sender_psid+ "說:"+ get[1] + '已經發完了唷');
         messenger.sendTextMessage('1485510774829902',sender_psid+ "說:"+ get[1] + '已經發完了唷');   
        }else if(get[0]==="yes"){

        
          messenger.sendTextMessage('1493495980699051',"yes");
          messenger.sendTextMessage('1522796911138184',"yes");
          messenger.sendTextMessage('1485510774829902',"yes");   
        }
        else if(get[0]==="no"){
        
          messenger.sendTextMessage('1493495980699051',"no");
          messenger.sendTextMessage('1522796911138184',"no");
          messenger.sendTextMessage('1485510774829902',"no");   
        
        }
      }
      else  if(webhook_event.message){
           fb.handleMessage(sender_psid, webhook_event.message,"");
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










