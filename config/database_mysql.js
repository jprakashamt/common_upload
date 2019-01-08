'user strict';

var mysql = require('mysql');

//local mysql db connection
exports.mysql_connection = function(params,callback)
{
    console.log(params);
    var connection = mysql.createConnection({
        host     : params['host'],
        user     : params['user'],
        password : params['pass'],
        database : params['db']
    });

    connection.connect(function(err) {
        if (err) throw err;
    });

    return callback(connection);
}
