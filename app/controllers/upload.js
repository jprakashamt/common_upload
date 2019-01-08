
var dateFormat = require('dateformat');
var Upload       = require('../models/upload');
var db_conn       = require('../../config/database');
var constant = require('../../config/constants');
var request = require('request');


 

exports.upload = function(req,res)
{
  let params = req.body;
  let files  = req.files;
  let response = {};
  if(params.source != '' && params.source != undefined)
  {
      if(constant.source[params.source] != '' && constant.source[params.source] != undefined)
      {
        response.params = params;
        if(files != '' && files != undefined && files.length > 0)
        {
       
          response.files = files;
          var class_res = require('./class.'+constant.source[params.source]);
          var validate            = class_res.validate(params); 
          if(validate.error_code != 1)
          {
            var post_params = {};
            post_params['params'] = params;
            post_params['files'] = files;
            var class_func = 'class_res.'+constant.source[params.source];
            eval(class_func)(post_params,function(resp){
              response.msg = resp.msg;
              response.error_code = resp.error_code;
              res.send(response);
            
            });
          
          }  
          else
          {
            response.msg = "please pass proper parameter";
            response.error_code = 1;
            res.send(response);
          }
        }
        else
        {
          response.msg = "please pass files";
          response.error_code = 1;
          res.send(response);
        }
        
      }
      else
      {
        response.msg = "please pass valid source";
        response.error_code = 1;
        res.send(response);
      }
  }
  else
  {
    response.msg = "please pass source";
    response.error_code = 1;
    res.send(response);
  }
  

}

exports.insertSource = function(req, resp) {
  
  MongoClient.connect(db_conn.db_product, function(err, client) {  
    if (err) { console.log('Could not connect'); }
     
        var response = {};
        response.post_data = req.body;
        response.msg = 'success';
        var upload            = new Upload();
    
    
        upload.id    = req.body.id;
        upload.name = req.body.name; 
        client.collection('notes').insertOne(
            upload,
            function (err, res) {
              if (err) {
                client.close();
                return console.log(err);
              }
              // Success
              client.close();
              resp.send(response);
            }
          )
    
   
  
});

}

exports.findSource = function(req,res)
{
    MongoClient.connect(db1.url, function(err, client) 
    {
    var query = { id: 1 };
    client.collection('notes').find(query).toArray(function(err, docs) {
   
    res.send(docs);
    
    client.close();
    });
    });
}



exports.insert = function(req,res)
{
    console.log(req.files);
    var response = {};
    response.post_data = req.body;
    response.msg = 'success';
    var upload            = new Upload();


    upload.id    = req.body.id;
    upload.name = req.body.name;
    upload.collection('tbl_main').insertOne({
        Employeeid: 4,
        EmployeeName: "NewEmployee"
    
});

};


    
