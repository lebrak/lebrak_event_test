// init var
var http = require('http')
    express = require('express')
 	app = express(),
 	path = require('path'),
 	mongoose = require('mongoose');

// set env port or 3000 if no env port
app.set('port', process.env.PORT || 3000);
// set path of views folder
app.set('views', path.join(__dirname, 'views'));
// use jade to dispay view file
app.set('view engine', 'jade');

// set the default directory of the public app
app.use(express.static(path.join(__dirname, 'app')));

// set default page when we get a 404
app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});


// connect to the database : bemyapp
mongoose.connect('mongodb://localhost/bemyapp', function(err) {
  if (err) { throw err; }
});

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('You can start this app on :  http://localhost:'+app.get('port'));
});
