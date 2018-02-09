var express = require('express')
, bodyParser = require('body-parser')
, request = require('request');

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Hello");
});

app.post('/', function (req, res) {
  //console.log(JSON.stringify(req.body));
  var sender_text = req.body.events[0].message.text;
  console.log(sender_text);
  switch (sender_text) {
    case "push":
        var postData = genPushData(req);
        break;
    case "reply":
        var postData = genReplyData(req);
        break;
    case "image":
        var postData = genImageData(req);
        break;
    case "location":
        var postData = genLocationData(req);
        break;
    case "sticker":
        var postData = genStickerData(req);
        break;
    case "buttons":
        var postData = genButtonsData(req);
        break;
    default:
        break;
  }
  
  request({
    url: postData.url,
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer p2G+zUDzkt9psnuVOSrFAVx7LE4maUY1hYAE3PJQdHSbCo9phDLMbubN699BcbgyNNeCLCN+JGSlurFCxOU8dR3ozeWIEqemrDg4t0PUuBO+mM/NBKosjOQU+x7onbxMOBOt35ClaLDz/a+e6XLJBgdB04t89/1O/w1cDnyilFU="
    },
    body: JSON.stringify(postData.body)
  }, function (error, response, body){
    //console.log(response);
  });
});


var genPushData = function(req){
  var sender_userid = req.body.events[0].source.userId;
  var sender_text = req.body.events[0].message.text;
  var postData = {"body":{"to": sender_userid,"messages":[{"type":"text","text":"Hello, YOU SAY "+sender_text}]},"url":"https://api.line.me/v2/bot/message/push"};
  return postData;
}

var genReplyData = function(req){
  var sender_replytoken = req.body.events[0].replyToken;
  var sender_text = req.body.events[0].message.text;
  var postData = {"body":{"replyToken": sender_replytoken,"messages":[{"type":"text","text":"Hello, YOU SAY "+sender_text},{"type":"text","text":"Hello, I am"}]},"url":"https://api.line.me/v2/bot/message/reply"};
  return postData;
}

var genImageData = function(req){
  var sender_replytoken = req.body.events[0].replyToken;
  var postData = {
      "body":{
        "replyToken": sender_replytoken,
        "messages":[{
            "type":"image",
            "originalContentUrl":"https://www.w3schools.com/css/paris.jpg",
            "previewImageUrl":"https://www.nasa.gov/sites/default/themes/NASAPortal/images/feed.png"
        }]
      },"url":"https://api.line.me/v2/bot/message/reply"};
  return postData;
}

var genLocationData = function(req){
  var sender_replytoken = req.body.events[0].replyToken;
  var postData = {
      "body":{
        "replyToken": sender_replytoken,
        "messages":[{
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        }]
      },"url":"https://api.line.me/v2/bot/message/reply"};
  return postData;
}

var genStickerData = function(req){
  var sender_replytoken = req.body.events[0].replyToken;
  var postData = {
      "body":{
        "replyToken": sender_replytoken,
        "messages":[{
            "type": "sticker",
            "packageId": "1",
            "stickerId": "1"
        }]
      },"url":"https://api.line.me/v2/bot/message/reply"};
  return postData;
}


var genButtonsData = function(req){
  var sender_replytoken = req.body.events[0].replyToken;
  var postData = {
      "body":{
        "replyToken": sender_replytoken,
        "messages":[{
          "type": "template",
          "altText": "this is a buttons template",
          "template": {
              "type": "buttons",
              "thumbnailImageUrl": "https://www.w3schools.com/css/paris.jpg",
              "title": "Menu",
              "text": "Please select",
              "actions": [
                  {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                  },
                  {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                  }
              ]
          }
        }]
      },"url":"https://api.line.me/v2/bot/message/reply"};
  return postData;
}

app.listen( process.env.PORT || 3000, function () {
  console.log('Example app listening for Line message.......');
});
