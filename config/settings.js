/*jslint node: true, nomen: true, devel: true, indent: 4 */

module.exports = function (app, express) {

    "use strict";

    var env = app.settings.env;

    // global settings
    app.site = {
        name : "site-name",
        page_title : 'Site Name',
        protocol : 'http://',
        port : 3333
    };

    // metadata
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    };


    // set domain
    if (env === 'development') { app.site.domain = "localhost:" + app.site.port + "/";
        } else if (env === 'staging') { app.site.domain = 'staging.site-name.com';
        } else { app.site.domain = 'site-name.com'; }

    // base url
    app.site.url = app.site.protocol + app.site.domain;

    // directories
    app.site.dir = {
        js : app.site.url + "js/",
        img : app.site.url + "img/",
        css : app.site.url + "css/"
    };

    // favicons
    app.site.favicon = [
        app.site.dir.img + 'favicon.png'
    ];

    // javascripts
    app.site.js = [
        app.site.dir.js + '_lib/head.js',
        app.site.dir.js + 'app.js'
    ];

    // stylesheets
    app.site.css = [
        app.site.dir.css + 'styles.css'
    ];

};
