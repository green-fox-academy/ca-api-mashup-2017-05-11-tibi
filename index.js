'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/assets', express.static(path.join(__dirname,'static')))


var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "wordnik"
});


/**
 * END POINTS
 */
app.get('/', function get(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

app.post('/logger', function post(req, res) {
	// 'YYYY-MM-DD HH:MM:SS'
	var d = new Date,
    date = [ d.getFullYear(),
             d.getMonth()+1,
             d.getDate(),
           ].join('-')+' '+
             [d.getHours(),
              d.getMinutes(),
              d.getSeconds()].join(':');

	const query = {
		sql: 'INSERT INTO history( keyword, created_at ) VALUES ( ?, ? )',
		values: [req.body.keyword, date]
	}
	conn.query( query, function (err, row) {
		if( err ) {
			console.log(err)
			res.send('SQL failed', err)
		} else {
			res.send('request arrived')
		}
	} )
});


app.listen(port, function () {
	console.log('Server is running at port: ' + port)
});