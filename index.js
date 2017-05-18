'use strict';
const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use('/assets', express.static(path.join(__dirname,'static')))

app.get('/', function get(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

app.listen(port, function () {
	console.log('Server is running at port: ' + port)
});