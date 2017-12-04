
var request = require("request");
var fb ={
  page_token:"EAAUm009elZBoBABmWMK1kZBCjudub4ktE4HZAdPeIYmqlhx0suSQDEjZAkrUGLMhfMjuwhWQgTUfnVmcpSHuIe5Ocnh6zM8bt39UIwes7hybzVhxiTpTt1j6cVNa4OKZAhZBPX3v7Saa9ZARnTUI6aKHndjIU0gsjY0Wnn3aZBMrwF0kvF0ov0eK",
  handleMessage:function(sender_psid, received_message,other_response){
    let response;
    if(received_message.text && !other_response){
      response ={
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "generic",
            "elements":[{
              "title":"成大勝十平台，開始使用",
              "subtitle":"選阿給我選",
              "image_url": "https://cdn2.ettoday.net/images/2709/2709688.jpg",
              "buttons":[
                {
                  "type":"postback",
                  "title":"餵我",
                  "payload": "feedme",
                },/*
                {
                  "type":"web_url",
                  "url":"https://luben3485.github.io/nckufood2.0webpage?" ,
                  "title":"學生投石",
                  "webview_height_ratio": "tall",
                  "messenger_extensions": true,
                  "webview_share_button": "hide",
                },*/
                
                {
                  "type":"web_url",
                  "url":"https://luffy.ee.ncku.edu.tw/~luben3485/nckufood2.0webpage/web.html?psid=" + sender_psid ,
                  "title":"學生投食",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true,
                  "webview_share_button": "hide",
                },
              ],
            }]
          }
        }
      }  
     fb.callSendAPI(sender_psid, response);
    }
    else{
      fb.callSendAPI(sender_psid,other_response);
    }


  },
  handlePostback:function(sender_psid, received_postback){
      let response;
      
          let payload = received_postback.payload;
              if (payload === 'yes') {
                  response = { "text": "那記得快去拿唷~~" }
              } else if (payload === 'no') {
                  response = { "text": "讚齁" }
              }else if(payload === 'feedme'){
                  response = {"text":"好，沒關係!把機會讓給其他人"}
              }
  fb.callSendAPI(sender_psid, response);
    
    
  },
  callSendAPI:function(sender_psid, response){
    let request_body = {
      "recipient":  {
        "id":sender_psid
      },
      "message": response
    }
  
    request({
      "headers":{
       "X-Frame-Options" : "ALLOW-FROM https://www.messenger.com/",
       "X-Frame-Options": "ALLOW-FROM https://www.facebook.com/"
    },
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs":{"access_token": fb.page_token},
      "method": "POST",
      "json": request_body
      },(err, res, body) => {
        if(!err){
          console.log('message sent!')
        }else{
          console.error("Unable to send message:" +err);
        }
     });
    
    
    
  }
}
module.exports = fb;




