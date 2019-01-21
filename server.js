var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;

//mount static files
app.use(express.static(__dirname + '/src'));

//basic router
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})

//middleware function for api route
var middleware = function(req, res, next){
  if(typeof req.params.date_string != 'undefined'){ //use date string from request params object
    req.time = Math.round(new Date(req.params.date_string).getTime());
    req.utc = new Date(req.params.date_string).toUTCString();
  }else {
    req.time = Math.round(new Date().getTime()); //use current date and time
    req.utc = new Date().toUTCString();
  }
  next();
}

//API endpoint
app.get("/api/timestamp/:date_string?", middleware ,function (req, res) {
  res.json({"unix": req.time, "utc": req.utc});
});

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
})


// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
