var http = require('http')
    , express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , config = require('./config');

app.use(bodyParser.json());
require('./routes').setup(app);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).send('An error occurred');
}

var server = http.createServer(app).listen(process.env.PORT || config.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});