'use strict';
const
  Subtract = require('array-subtract'),
  https = require('https'),
  fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
 // app.listen(process.env.PORT || 17487,()=>console.log('app is running on port 17487!'));
var subtract = new Subtract((a, b) => { return a === b })
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

app.get('/nckufood_student',(req,res)=>{
  
  res.end('{"status":"success"}'); 
  var ajaxdata = req.query;
  var food_num = 1;
  var multi_rate =5;
  
  //從db抓下來
  var ori_candidate_people = ["1493495980699051","1522796911138184","1485510774829902","1553340364755635","1983767974968546"];
  var candidate_probability = [0.2,0.2,0.2,0.2,0.2];
 
  var selectedPeople = func.selected_people(food_num, multi_rate, ori_candidate_people, candidate_probability)
  var myloveobj = {
      id: ajaxdata.id,
      selectedPeople : selectedPeople
   };
  var json = JSON.stringify(myloveobj);
  fs.writeFile('log.json', json, 'utf8');

  STU.addStudents({
    id:ajaxdata.id,
    food_name:ajaxdata.food_name,
    food_number:ajaxdata.food_number,
    deadline:ajaxdata.deadline,
    location:ajaxdata.location,
    image_url:ajaxdata.image_url
  });
  //STU.list_Students();

  /////Create an event
  
  var ev = require('./event/event');
  ev.event({
    id:ajaxdata.id,
    food_name:ajaxdata.food_name,
    food_number:ajaxdata.food_number,
    deadline:ajaxdata.deadline,
    location:ajaxdata.location,
    image_url:ajaxdata.image_url,
    promotion : selectedPeople
  });
  EVENTS.push(ev);
  /*
  for(var i = 0; i < EVENTS.length; i++){
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
 /*
 for(var i=0;i < myloveobj.selectedPeople.length;i++){
    fb.handleMessage(myloveobj.selectedPeople[i],"",sendfood);
  console.log("發食物給"+ myloveobj.selectedPeople[i]+"囉");
     // messenger.sendTextMessage(myloveobj.selectedPeople[i], '沒了');
  }
*/
  console.log("promotion:"+ev.promotion);  
  console.log("promotffff:"+selectedPeople);  
  for(var i=0;i < ev.promotion.length;i++){
    fb.handleMessage(ev.promotion[i],"",sendfood);
    console.log("發食物給"+ ev.promotion[i]+"囉");
  }
  fb.handleMessage(ev.id,"",tossfooder);
   // fb.handleMessage(myloveobj.id,"",tossfooder);
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
          var deleted_index;
          for(var i = 0; i < EVENTS.length; i++){
            if(EVENTS[i].id === sender_psid && EVENTS[i].food_name === get[1]){
              deleted_index=i;
              var pro_sub_no = subtract.sub(EVENTS[i].promotion,EVENTS[i].who_say_no);
              var who_no_response = subtract.sub(pro_sub_no,EVENTS[i].who_say_yes);  
              for(var j=0;i<pro_sub_no.length;i++){
                fb.handleMessage(pro_sub_no[j],"",{"text": EVENTS[i].food_name + "已經發完了"});//發訊息給除了no的人 說食物沒了
              } 
            //降低沒回應者的機率   
            }
          }
          EVENTS.splice(deleted_index,1);
        /*
         messenger.sendTextMessage('1493495980699051',sender_psid+ "說:"+ get[1] + '已經發完了唷');
         messenger.sendTextMessage('1522796911138184',sender_psid+ "說:"+ get[1] + '已經發完了唷');
         messenger.sendTextMessage('1485510774829902',sender_psid+ "說:"+ get[1] + '已經發完了唷');   
       */
        }else if(get[0]==="yes"){
          
          
          for(var i = 0; i < EVENTS.length; i++){
           if(EVENTS[i].id === get[1]){
             EVENTS[i].who_say_yes.push(sender_psid);
             }
           fb.handleMessage(sender_psid,"",{"text":"you say yes"});
          }/*
         messenger.sendTextMessage('1493495980699051',"yes");
          messenger.sendTextMessage('1522796911138184',"yes");
          messenger.sendTextMessage('1485510774829902',"yes");   
       */
        }else if(get[0]==="no"){
        
        for(var i = 0; i < EVENTS.length; i++){
          if(EVENTS[i].id === get[1]){
            EVENTS[i].who_say_no.push(sender_psid);
          }
          fb.handleMessage(sender_psid,"",{"text":"you say no"});
        }/*
          messenger.sendTextMessage('1493495980699051',"no");
          messenger.sendTextMessage('1522796911138184',"no");
          messenger.sendTextMessage('1485510774829902',"no");   
        */
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










