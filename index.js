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
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});