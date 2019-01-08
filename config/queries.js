var constant = require('./constants');
var MongoClient = require('mongodb').MongoClient;
// exports.queries = function(params)
//  {
  //  console.log(constant.db_selection);
     switch(constant.db_selection)
     {
         case '1':
         //mysql queries
         var db_con = require('./database_mysql');
        
         exports.dbproduct_maintbl_ins = function(params,callback)
         {
            var conn = db_con.mysql_connection(constant.db_product_master_mysql);
             let query = "Insert into tbl_catalogue_main SET product_id = 'swl'";
             console.log(conn);
             conn.query(query, function(err, result) {
                if (err) {
                    return res.status(500).send(err);
                }
                else
                    console.result;
            });
        }
         break;

         case '2':
         db_conn = constant.db_product_master_mongo;
         var db = 'mongodb://'+db_conn['host']+'/'+db_conn['db'];

         exports.dbproduct_maintbl_ins = function(params,callback)
         //var mongo_dbproducr_maintbl_ins = function(params)
         {
            var Upload       = require('../app/models/upload');
            MongoClient.connect(db, function(err, client) 
            { 
                if (err) { console.log('Could not connect'); }
                else
                {
                   var upload            = new Upload();
    
    
                    upload.name    = params.params.source;
                    //console.log(params);
                    //console.log(upload.name);
                    client.collection('tbl_catalogue_main').insertOne(upload,function (err, res) 
                    {
                        if (err) 
                        {
                          client.close();
                          return callback(err);
                        }
                        else
                        {
                            client.close();
                            return callback(res);
                        }
                    });
                }
            });
        }
         //mongodb queries
         break;
         
         case '3':
         //both
         break;
     }
//  }


