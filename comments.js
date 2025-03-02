// Create web server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      if (body.length > 1e6)
        request.connection.destroy();
    });
    request.on('end', function () {
      var post = qs.parse(body);
      console.log(post);
      response.end(JSON.stringify(post));
    });
  } else {
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found\n');
        response.end();
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }
});

// Listen on port 8000, IP defaults to