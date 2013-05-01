/*jslint node: true, nomen: true, devel: true, indent: 4 */

// define variables
var express = require('express'),
    http = require('http'),
    https = require("https"),
    path = require('path'),
    url = require('url'),
    md5 = require('MD5'), // MD5 functionality
    resource = require('express-resource'), // Enable resource routing
    app = module.exports = express();

// app configuration
app.configure(function () {
    "use strict";
    app.set('views', __dirname + '/views'); // set view dir
    app.use(require('stylus').middleware(__dirname + '/public')); // use stylus for css
    app.use(express.static(__dirname + '/public')); // serve static files
});

// require additional config files
//var Banjin = require('./functions/banjin.js');
require('./config/setup.js')(app, express);
require('./config/settings.js')(app, express);
require('./config/routes.js')(app, app.site);
require('./config/errors.js')(app, app.site);

//app.resource('search', require('./routes/search.js'));


// start server
http.createServer(app).listen(process.env.PORT || app.site.port, function () {
    "use strict";
    console.log("Express server listening on port " + app.site.port);
});
