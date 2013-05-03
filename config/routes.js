/*jslint node: true, nomen: true, devel: true, indent: 4 */

module.exports = function (app, site, parser) {

    "use strict";

    var url = require('url'),
        md5 = require('MD5'),
        fs = require('fs'),
        util = require('util'),
        xml2js = require('xml2js'),
        parseString = require('xml2js').parseString,
        parser = new xml2js.Parser(),
        http = require('http');
        

        function theme_file(req) {

            if ( typeof req.query["theme"] !== 'undefined' ) {
                var theme = './public/themes/' + req.query["theme"] + '.tmTheme';
            } else if ( typeof req.route.params[1] !== 'undefined' ) {
                var theme = './public/themes/' + req.route.params[1] + '.tmTheme';
            } else {
                var theme = './public/themes/Contrast/Darkside.tmTheme';
            }

            return theme;

        }


    // = = = = =
    // HOME PAGE
    // = = = = =
    app.get('/', function (req, res) {

        fs.readFile(theme_file(req), function(err, data) {

            parser.parseString(data, function (err, result) {

                var data = {
                    site: site,
                    theme: JSON.stringify( result )
                };
                
                res.render('code/empty', data); // load view

            });

        });

    });

    // = = = = =
    // End HOME
    // = = = = =


    // = = = = =
    // HELLO PAGE
    // = = = = =
    app.get('/render/*', function (req, res) {

        fs.readFile(theme_file(req), function(err, data) {

            parser.parseString(data, function (err, result) {

                var data = {
                    site: site,
                    theme: JSON.stringify( result )
                };
                
                res.render('code/' + req.route.params[0], data); // load view

            });

        }); 


    });

    // = = = = =
    // End RENDER
    // = = = = =


    // = = = = =
    // HELLO PAGE
    // = = = = =
    app.get('/parse/*', function (req, res) {

        parser.addListener('end', function(result) {

            var page_data = {
                site: site,
                theme: JSON.stringify( result )
            };

            res.render('theme', page_data); // load view            

        });

        fs.readFile('./public/themes/Github.tmTheme', function(err, data) {
            
            parser.parseString(data, res);

        });

    });

    // = = = = =
    // End HELLO
    // = = = = =


};
