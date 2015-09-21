var express = require('express')
    , path = require('path')
    , clientDir = path.join(__dirname, './public')

module.exports.setup = function(app){

    app.use(express.static(clientDir));

    app.get('/*', function(req,res, next){
        res.format({
            html: function(){
                res.sendFile(path.join(clientDir, 'index.html'));
            },
            json: function(){
                next();
            }
        });
    })
}