
var constants = require('../../config/constants');
var queries = require('../../config/queries');


exports.validate = function(params)
 {
	let response = {};
	response.error_code = check(params.insta);
	response.error_code = check(params.docid);
	return response;
  
};

function check(fields)
{
	if(fields == '' || fields == undefined)
		return 1;
	else	
		return 0;
}

exports.mcatalogue = function(post_params,callback)
{
	var respons = {};
	if(post_params['params']['insta'] == 1)
	{
		var sendQueue = require('../../config/send_to_queue');
		sendQueue.sendToQueue('1',post_params);
		response.error_code = 0;
		response.msg = 'Data send to queue';
		return callback(respons);	
	}
	else
	{
		//console.log(queries.mongo_dbproducr_maintbl_ins(post_params));
		queries.dbproduct_maintbl_ins(post_params, function(res){
    		// Here you have access to your variable
				//console.log();
				if(res.insertedId != '' && res.insertedId != undefined)
				{
					respons.error_code = 0;
					respons.msg = 'DATA INSERTED SUCCESSFULLY';	
				}
				else
				{
					respons.error_code = 1;
					respons.msg = 'Not inserted';	
				}
				return callback(respons);
		});
	}
	//console.log(respons);
	

	
}