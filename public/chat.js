//everyhting happens when the page loads.
//This is considered the front end part of the javascript code

window.onload = function() {

//messages starts with 0 messages, and many
	//variables are defined here including an empty array to store all the messages.
	
	var messages = [];
	var name = document.getElementById("name");
	var socket = io.connect('http://localhost:3100');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");

	var name = document.getElementById("name");

//when an event occurs, this function will bind the data received and
// updates the messages array storage as well as the div id="content".  

//If there is a problem loading or receiving the messages,
// it will say "A problem happened". 

//When there is a message, this function passes "data" parameter
//to push the data to the page  with the name in bold and
//updates the messages in an array.
	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			
			for(var i=0; i<messages.length; i++){
			html += '<strong>' + (messages[i].username ? messages[i].username :
      'Server') + ':</strong> ';
       html += messages[i].message + '<br>';

}


			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
			
		} else {
			console.log("A problem happened: ", data);
		}
	});

//when you click the send button, this function will 
//bind the name value to your message.  If the name area is blank,
//the user will be prompted to enter their name.
//else the message will be bound to the variable text in the
//as the field.value

	sendButton.onclick = function() {
		if(name.value =="") {
			alert("please, typle your name!");
		}else {
			var text = field.value;
			var user = name.value;
			socket.emit('send', {message:text, username: user});
			field.value = "";
		}

	};
}