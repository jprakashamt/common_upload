exports.encode = function(doc) {  
    return new Buffer(JSON.stringify(doc));
  }