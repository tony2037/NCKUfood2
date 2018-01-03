'use strict' 
const
  ev = require('./event/event'), 
  Subtract = require('array-subtract'),  //用於兩個矩陣相減
  https = require('https'), //用於打開https port
  fs = require('fs'), //讀檔案模組
  express = require('express'), //後端
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),
  fb = require('./fb'), 
  func = require('./modules/Users/function'),
  probability = require('./modules/Users/probability'),
  FBMessenger = require('fb-messenger'),
  db = require('./db/connect'),
  STU = require('./modules/Students/Students.model'),
  mes = require('./utils/mes'),
  messenger = new FBMessenger(fb.page_token),
  US = require('./modules/Users/Users.model')

var subtract = new Subtract((a, b) => { return a === b })
// 連上db
db.start()
// 將目前的投食事件存到這個array
global.EVENTS = []
// 給予他公鑰和私鑰
var 
  privateKey  = fs.readFileSync(__dirname + '/ssl/private.key'),
  certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt'),
  ca = fs.readFileSync(__dirname + '/ssl/ca_bundle.crt'),
  credentials = { key: privateKey, cert: certificate, ca: ca } 
//打開 https port 
  https.createServer(credentials, app).listen(17486, function () {
    
    })
app.get('/rending',(req,res)=>{
  var id = req.query.id
  US.findbyid(id,(exist, responds)=>{
    console.log(exist);
    if(exist === true){
          res.send(responds)
    }
      else if(exist === false){
        res.send(exist);

      }
    })
 // res.send(US.rending(id))
})
app.get('/nckufood_subscribe',(req,res)=>{

  var ajaxdata = req.query
  var newsubscribe = []//origin subscribe array subtract value(chinese store name)
  for(var i=0;i < ajaxdata.subscribe.length ; i++ ){
    newsubscribe.push({id: ajaxdata.subscribe[i].id,check:ajaxdata.subscribe[i].check})
  }
  var data = { id:ajaxdata.id , subscribe: newsubscribe}// following function receives this data
//  console.log("sss:"+data.subscribe[0].check)
  US.subscribe_update(data)// update subscribe(we'll check whether you subscribed in this function)
  res.send("true")
})

app.get('/nckufood_shop',(req,res)=>{
  //Give an id to find everything this user subscribe
  //return [{value:store_name,check:Boolean}]
  var id = req.query.id;
//  res.send(US.rending(id));
})
app.get('/nckufood_student',(req,res)=>{
  res.send('{"status":"success"}')  
  var ajaxdata = req.query 
  
  //從db抓下來
 // var ori_candidate_people = ["1724602970946499","1493495980699051","1522796911138184","1485510774829902","1553340364755635","1983767974968546"] 
 // var candidate_probability = [0.2,0.2,0.2,0.2,0.2] 
  US.who_subscribe_storeA("free",(ori_candidate_people)=>{
    console.log('ori')
    console.log(ori_candidate_people)

     var selectedPeople =  probability(ori_candidate_people,ajaxdata.food_number,5)
    console.log('select')
    console.log(selectedPeople)
   
      STU.addStudents({
        id:ajaxdata.id,
        food_name:ajaxdata.food_name,
        food_number:ajaxdata.food_number,
        deadline:ajaxdata.deadline,
        location:ajaxdata.location,
        image_url:ajaxdata.image_url
      }) 

      //Create an event
      

      ev.event({
        id:ajaxdata.id,
        food_name:ajaxdata.food_name,
        food_number:ajaxdata.food_number,
        deadline:ajaxdata.deadline,
        location:ajaxdata.location,
        image_url:ajaxdata.image_url,
        promotion : selectedPeople,
        who_say_yes:[],
        who_say_no:[]
      }) 
      var ev_element = Object.assign({},ev) 
      global.EVENTS.push(ev_element) 
    //Create an event

      var sendfood = mes.sendfood(ajaxdata)
      var tossfooder = mes.tossfooder(ajaxdata)
      for(var i=0; i < ev.promotion.length;i++){
        fb.handleMessage(ev.promotion[i],"",sendfood)
        console.log("發食物給 " + ev.promotion[i] + "!")
      }
      fb.handleMessage(ev.id,"",tossfooder) 
       // fb.handleMessage(myloveobj.id,"",tossfooder)
  })

}) 


/*--webpage--*/
app.get('/web_student',function(req,res){
  res.sendFile(__dirname + '/public/nckufood_student.html') })
  
/*--both nckufood_shop and nckufood_student--*/
app.get('/js/imgur.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/imgur.js") 
  }) 
app.get('/css/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/style.css") 
  }) 
app.get('/css/mobile-style.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/mobile-style.css") 
  }) 
app.get('/css/loading-spin.svg', function(req, res) {
  res.sendFile(__dirname + "/public/css/loading-spin.svg") 
  }) 
/*--both nckudood_shop and nckufood_student--*/

/*---nckufood_shop---*/
app.get('/web_shop',function(req,res){
  res.sendFile(__dirname + '/public/nckufood_shop.html') 
  }) 


app.get('/css/nckufood_shop.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/nckufood_shop.css") 
  }) 

app.get('/js/nckufood_shop.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/nckufood_shop.js") 
  }) 
/*---nckufood_shop---*/

/*---nckufood_student----*/
app.get('/web_student',function(req,res){
  res.sendFile(__dirname + '/public/nckufood_student.html') 
  }) 
app.get('/css/nckufood_student.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/nckufood_student.css") 
  }) 
app.get('/js/nckufood_student.js', function(req, res) {
  res.sendFile(__dirname + "/public/js/nckufood_student.js") 
  }) 
/*---ncku_student----*/

/*----subscribe----*/
app.get('/css/subscribe2.css', function(req, res) {
  res.sendFile(__dirname + "/public/css/subscribe2.css") 
  }) 
app.get('/js/subscribe2.js', function(req, res){
  res.sendFile(__dirname + "/public/js/subscribe2.js") 
  }) 
app.get('/web_subscribe',function(req,res){
  res.sendFile(__dirname + '/public/subscribe2.html') 
  }) 
/*----subscribe----*/


//處理fb事件
app.post('/webhook',(req, res)=>{
  let body = req.body 
  if(body.object === 'page'){
    mes.dealmes(body,res,global.EVENTS)
  }
  else{
    res.sendStatus(404) 
  }
}) 

app.get('/webhook',(req,res)=>{
  let VERIFY_TOKEN = "aaabbb" 
  let mode = req.query['hub.mode'] 
  let token = req.query['hub.verify_token'] 
  let challenge = req.query['hub.challenge'] 
  if(mode&& token){
    if(mode==='subscribe' && token === VERIFY_TOKEN){
      res.status(200).send(challenge) 
    }else{
      res.sendStatus(403) 
    }
  }
}) 
