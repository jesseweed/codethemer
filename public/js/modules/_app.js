/*jshint camelcase: true, curly: true, eqeqeq: true, latedef: false, undef: false, strict: true */

// define variables
var App, console, Nav
    host = location.protocol + '//' + location.host + '/';

// load scripts    
head.js(host + 'js/_lib/mootools/core.js');
head.js(host + 'js/_lib/mootools/more.js');
head.js(host + 'js/_lib/image-hd.js');
head.js(host + 'js/_lib/spin.min.js');

head.ready(function() {
   App.init();
});

// Main App class
App = {

    debug : true,

    // Tie logging to debug flag
    log : function (what) {

        "use strict";

        if (typeof console !== "undefined" && this.debug === true) {
            console.log(what);
        }
    },

    init : function() {
        App.Nav.bind();
    }

};

// End App

// Location functionality
Location = {
    
    protocol : location.protocol,
    host : location.host,
    url : this.host,
    path : location.pathname,

    current : function () {
        return this.segment(1);
    },

    // return a uri segment
    segment : function (i) {
        var segment = location.pathname.split('/');
        segment = segment[i];

        if (typeof segment !== 'undefined') {
            return segment;
            } else { return '';
        }
    },

    // return current page name
    page : function () {

        "use strict";

        var path = location.pathname.split('/');
        return path.slice(-1)[0];

    }
}
// END location



// Domready
head.ready(function() {

    var current = Location.current();

});
