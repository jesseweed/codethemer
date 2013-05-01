/*jslint node: true, nomen: true, devel: true, indent: 4 */

module.exports = function (app, site) {

    "use strict";

    var url = require('url'),
        md5 = require('MD5'),
        http = require('http');


    // = = = = =
    // HOME PAGE
    // = = = = =
    app.get('/', function (req, res) {

        var data = {
            site: site
        };

        res.render('code/empty', data); // load view

    });

    // = = = = =
    // End HOME
    // = = = = =


    // = = = = =
    // HELLO PAGE
    // = = = = =
    app.get('/render/*', function (req, res) {

        var path = req.url.split('/');

        // console.log(path[2]);

        var data = {
            site: site
        };

        res.render('code/' + path[2], data); // load view

    });

    // = = = = =
    // End HELLO
    // = = = = =


    // = = = = =
    // HELLO PAGE
    // = = = = =
    app.get('/hello/world', function (req, res) {

        var data = {
            site: site
        };

        res.render('hello', data); // load view

    });

    // = = = = =
    // End HELLO
    // = = = = =


};
