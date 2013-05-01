/*jslint node: true, nomen: true, devel: true, indent: 4 */

module.exports = function (app, express) {

    "use strict";

    // local
    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        app.locals.pretty = true; // prettify html output
    });

    // staging
    app.configure('staging', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        app.locals.pretty = true; // prettify html output
    });

    // production
    app.configure('production', function () {
        app.use(express.errorHandler());
        app.locals.pretty = false; // don't prettify html output
    });

    // app configuration
    app.configure(function () {
        app.set('port', process.env.PORT || 3000); // set port to run on
        app.set('view engine', 'jade'); // use jade for views
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(require('stylus').middleware(__dirname + '/public')); // use stylus for css
        app.use(express.bodyParser());  // parse request bodies (req.body)
        app.use(express.methodOverride());
        app.use(express.cookieParser('agc6235hsv3hskd736fhb0183js')); // secret
        app.use(express.session());
        app.use(app.router);
        app.use(express.favicon());
    });

};