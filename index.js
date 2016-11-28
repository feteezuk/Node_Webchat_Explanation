//This require("express"); loads the express library and defines it as a local variable called express.   When a path is passed into require, it will look for a .js or for a folder with an index.js file in it.  In this case,
//the file is going through the express folder to find the index.js file.



var express = require("express");

//This line creates a new application and defining it as app

var app = express();

//we are defining a port equal to 3100

var port = 3100;

//this registers a route for the application along with the 2 request and response paramaters.
//This is an empty GET request with no parameters and two callback parameters "req" and "res". The res is the response saying "It is working"
// app.get("/", function(req, res) {
// 	res.send("It is working");
// });

//this code informs Express JS that the views of this
//project will come from the foler '/tpl' and the view engine
// will be jade.  Then, the render method uses the response to load the page.


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res) {
	res.render("page");
});

//this line tells Express.js to look for a resource in the public folder

app.use(express.static(__dirname + '/public'));


//We are sending the Express server to include socket.io so the chat will happen
//on the same port 
var io = require('socket.io').listen(app.listen(port));


//io is the connection handler, and the object "socket" is the client's socket.  It is a 
//junction between the sever and the browser, and when the connection is complete, it will say "Welcome to our chat".

io.sockets.on('connection', function(socket) {
	socket.emit('message', {message: 'welcome to our chat' });
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});
});

console.log("Now Listening at port " + port);