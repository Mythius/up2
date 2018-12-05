var http= require('http');
var clientUI=require('fs').readFileSync("chatclient.html");
var emulation = require('fs').readFileSync("EventSourceEmulation.js");
var clients=[];
setInterval(function(){
    client.write(":ping\n");
},2000);
var server = new http.Server();
server.on("request",function(request,response){
    var url=require('url').parse(request.url);
    if(url.pathname==="/"){
        response.writeHead(200,{"Content-Type": "text/html"});
        response.write("<script>"+emulation+"</script>");
        response.write(clientUI);
        response.end();
        return;
    }
    else if(url.pathname !== "/chat"){
        response.writeHead(404);
        response.end();
        return;
    }
    if(request.method==="POST"){
        request.setEncoding("utf8");
        var body="";
        request.on("data",function(chunk){body+=chunk;});
        request.on("end",function(){
            resopnse.writeHead(200);
            response.end();
            message = 'data: '+body.replace('\n','\ndata: ')+"\r\n\r\n";
            clients.forEach(function(client){client.write(message)});
        });
    }
    else {
        response.writeHead(200,{'Content-Type': "text/event-stream"});
        response.write("data: Connected\n\n");
        request.connection.on("end",function(){
            clients.splice(clients.indexOf(response),1);
            response.end();
        });
        clients.push(response);
    }
});
server.listen(8000);
