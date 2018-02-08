var express = require('express')
    , bodyParser = require('body-parser'
    , request = require('request') ) ;

var app = express();
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});