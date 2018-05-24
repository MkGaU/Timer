/**
 * [...]  
 * @author  Viet Pham
 * @version 1.0, 18/05/23
 * @since   
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mine = {
  ".html" : "text/html",
  ".css" : "text/css"
};

// Create a server
http.createServer( function (request, response) {  
  if(request.url == "/") {
    filePath = "../main.html";
  }else{
    filePath = request.url;
  }
  // console.log(path.parse(filePath).ext);
  response.writeHeader(200, {"Content-Type": mine[path.parse(filePath).ext] + ""}); 
   fs.readFile("../"+filePath, function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else { 
         // Write the content of the file to response body
         response.write(data);   
      }
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');