/**
 * Created by lijie8 on 2015/1/18.
 */
var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
Sentence = require('./controllers/sentence')

IndexRoute = require('./routes/index')
PracticeRoute = require('./routes/practice')
SentenceRoute = require('./routes/sentence')
AdminRoute = require('./routes/admin')

var bodyParser = require('body-parser')
var port = 5000;
var app = express()

mongoose.connect('mongodb://localhost/english_sentences')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))

var server = require('http').createServer(app);
server.listen(port);
//global.io = SocketIO.init(server)

app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, '/js')))

//设置路由
app.use('/', IndexRoute)
app.use('/practice', PracticeRoute)
app.use('/sentence', SentenceRoute)
app.use('/admin', AdminRoute)

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;