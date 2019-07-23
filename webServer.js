var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();
var port = process.env.PORT || 8080;
app.use(serveStatic(__dirname,null),'/');

app.listen(port, function(){
    console.log('%s: Node server started on %s ...', Date(Date.now()), port);
});