const Messenger = require('fb-messenger')
var messenger = new Messenger("EAAcxmUJrycABAHHFAUZCDd9mJjUJv6jQmvyhrKHzw5PZBfADNdI9H6aiY9JX5oowyGzOWvhb1hHMetpUjR0ItORNjnyPSpZAVwkyITfk7dKk5QnAJJopHh35gBfUWZBtCVHGduSfZCS3GW1gYmVRumqv4reETqrztZBmA3uaVfcZChB43rF5MHh")
var request = require("request");
var fb ={
  page_token:"EAAcxmUJrycABACIGmtnO4NgDfqMtZBy5nAFRkp9UDOsXOnMymEoc3ZBZAx62Mlf6YT0OrfNuBcuFcBBaA1aqEn4xXdwR7Cx2FDcjQVFFJiZAeZBwDabGx9Skto1tx9P6mwEoBBppCxwAvvfCg53sty7fx6Wx3BnKbjKldFH0xAoHQ4C3X9iZAW",
  handleMessage:function(sender_psid, received_message,other_response){
    let response;
    if(received_message.text && !other_response){
      response ={
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "generic",
            "elements":[{
              "title":"成大剩食通知2.0",
              "subtitle":"開始使用",
              "image_url": "https://scontent.ftpe2-1.fna.fbcdn.net/v/t31.0-8/21427533_115247419188626_8316341334790147882_o.png?oh=f18b0f9ad0135fcc057649a482444459&oe=5AD2C719",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://luffy.ee.ncku.edu.tw/~luben3485/nckufood2.0webpage/subscribe.html?psid=" + sender_psid ,
                  "title":"管理訂閱",
                  "webview_height_ratio": "tall",
                  "messenger_extensions": true,
                  "webview_share_button": "hide",
                },
                {
                  "type":"web_url",
                  "url":"https://luffy.ee.ncku.edu.tw/~luben3485/nckufood2.0webpage/nckufood_shop.html?psid=" + sender_psid ,
                  "title":"店家投食",
                  "webview_height_ratio": "tall",
                  "messenger_extensions": true,
                  "webview_share_button": "hide",
                },
                
                {
                  "type":"web_url",
                  "url":"https://luffy.ee.ncku.edu.tw/~luben3485/nckufood2.0webpage/nckufood_student.html?psid=" + sender_psid ,
                  "title":"學生投食",
                  "webview_height_ratio": "tall",
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
              } else if (payload === 'subscribe') {
                  response = { "text": "此功能將推出，敬請期待！" }
              }else if(payload === 'no'){
                  response = {"text":"好，沒關係!把機會讓給其他人"}
              }
  fb.callSendAPI(sender_psid, response);
    
    
  },
  callSendAPI:function(sender_psid, response){
    let request_body = {
      "messaging_type": "RESPONSE",
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




