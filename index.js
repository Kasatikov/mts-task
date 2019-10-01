var express = require('express');
var app = express();
var path = require('path');
var apps = require('./test_app_set.js');
var user_apps = require('./user_app_set.js');

app.use(express.static('public'));

app.use('/require_plugins', express.static(path.join(__dirname, 'node_modules')));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/login', function (req, res) {
  if (req.body.login != '' && req.body.password != '') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ auth: true }));
  }
  else {
    res.sendStatus(401);
  }
});

app.get('/getApps', function (req, res) {
  res.send(apps);
});

app.get('/getUserApps', function (req, res) {
  res.send(user_apps);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
