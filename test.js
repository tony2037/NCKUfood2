const express = require("express");
const app = express();
const port = 17487;
const bodyParser = require("body-parser");


app.get('/', function (req, res) {
  if (req.query['hub.verify_token'] === '<validation_token>') {
      res.send(req.query['hub.challenge']);
        }
          res.send('Error, wrong validation token');
          })


app.post('/', function (req, res) {
  messaging_events = req.body.entry[0].messaging; //所有訊息

    for (i = 0; i < messaging_events.length; i++) { // 遍歷毎一則

        event = req.body.entry[0].messaging[i]; 
            sender = event.sender.id; // 誰發的訊息

                if (event.message && event.message.text) {
                      text = event.message.text;
                            // Handle a text message from this sender

                                }
                                  }
                                    res.sendStatus(200);
                                    });

app.listen(port , ()=>{
    console.log("Listen on port : " + port);
    });
