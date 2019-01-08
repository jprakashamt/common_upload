var home = require('../app/controllers/home');
var upload = require('../app/controllers/upload');

//you can include all your controllers

module.exports = function (app) {
    
    app.post('/find',upload.findSource);
    app.post('/insert',upload.insertSource);
    app.post('/upload',upload.upload);

}
