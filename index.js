var express = require('express')
    , bodyParser = require('body-parser'
    , request = require('request') ) ;

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello");
  });

app.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  var sender_replytoken = req.body.events[0].replyToken;
  var sender_text = req.body.events[0].message.text;
  var postData = {"replyToken": sender_replytoken,"messages":[{"type":"text","text":"Hello, YOU SAY "+sender_text},{"type":"text","text":"Hello, I am PPHomeBot"}]};
  request({
      url: "https://api.line.me/v2/bot/message/reply",
      method: "POST",
      headers: {
          "content-type": "application/json",
          "Authorization": "p2G+zUDzkt9psnuVOSrFAVx7LE4maUY1hYAE3PJQdHSbCo9phDLMbubN699BcbgyNNeCLCN+JGSlurFCxOU8dR3ozeWIEqemrDg4t0PUuBO+mM/NBKosjOQU+x7onbxMOBOt35ClaLDz/a+e6XLJBgdB04t89/1O/w1cDnyilFU="
      },
      body: JSON.stringify(postData)
      }, function(error, response, body){
          console.log(response);
      });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening for messaging');
});