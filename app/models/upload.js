
var mongoose = require('mongoose');
//define the schema for our user model
var db_product_schema = mongoose.Schema({	
	id:{ type: Number, default: 1 },
	name: String,
	mail: String,
	password: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role_id: { type: Number, default: 2 }
});


module.exports = mongoose.model('db_product', db_product_schema);