process.title = 'bm-server';
var webSocketServer = require('websocket').server;
var http = require('http');

// if a port number is passedinto the command, use that, else default to 1337
var port = (process.argv[2]||"").trim() || 1337;

var sessions = {};

var server = http.createServer(function(request, response){});
server.listen(port, function(){
	console.log(`Server active on port ${port}`);
});

var wsServer = new webSocketServer({
	httpServer: server
});

wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin);	
	var role, session, index;
	connection.on('message', function (message) {
		var data = JSON.parse(message.utf8Data);
		switch(data.action){
			case "init_session":
				if(!sessions[data.sessionid]){
					sessions[data.sessionid] = {id: data.sessionid, master: null, slaves:[]};
				}
				session = sessions[data.sessionid];
				if(data.role === 'master' && !sessions[data.sessionid].master){
					session.master = connection;
					role = 'master';
				}else{
					index = session.slaves.length;
					session.slaves.push(connection);
					role = 'slave';
				}
				console.log(`${role} joined session: ${data.sessionid}`);
				break;
			case "set_state":
				if(role !== 'master') break;
				session.slaves.forEach(slave=>{
					slave.sendUTF(JSON.stringify({
						action: 'set_state', 
						state: data.state
					}));
				});
				break;
		}
	});
	
	connection.on('close', function(connection){
		if(role == 'slave') session.slaves.splice(index, 1);
		else session.master = null;
		console.log(`${role} left session: ${session.id}`);
	});
	
});