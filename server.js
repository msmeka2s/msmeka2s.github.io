const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

// This line is from the Node.js HTTPS documentation.
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Create a service (the app object is just a callback).
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);