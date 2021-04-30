const mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root",
    "password":"root",
    "database": "dados",
    "host": "localhost",
    "port": 3307
});

exports.pool = pool;