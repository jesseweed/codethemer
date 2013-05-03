/* ==========================================================================================================================
   
   FILE: LOCATE.JS
   
   DESCRIPTION: BROSWER & FILE LOCATIONS

   AUTHOR(S): JESSE WEED
   
   JS HINT SETTINGS: jshint indent: 4, camelcase: true, curly: true, eqeqeq: true, latedef: false, undef: false, strict: true

========================================================================================================================== */


App.Browser = {

    // redirect to given url after a specific amount of time
    forward : function (url, time) {

        "use strict";

        if (typeof time !== 'undefined') {
            setTimeout(
                function () {
                    if (url !== false) {
                        location.href = url;
                    }
                }, time * 1000);
        } else {
            if (url !== false) {
                window.location = url;
            }
        }

    }, // End : forward

     // go to specific url
    go : function (url) {
        
        "use strict";

        location.href = url;

        console.log('go to: ' + url);

    }, // End : go

    // initialize any autoload stuff
    init : function () {

        "use strict";

        App.log('locate.js loaded.');

    }, // End : init

    // return current page name
    page : function () {

        "use strict";

        var path = location.pathname.split('/');
        
        return path.slice(-1)[0];

    }, // End : page

     // return current page name
    path : function () {

        "use strict";

        return location.pathname;

    }, // End : path
    

    // return current page name
    query : function (term) {

        "use strict";

        var data = false,
            loc = location.search,
            q = loc.split('?'),
            query = '&' + q[1],
            parts = query.split('&');


        $.each(parts, function (index, value) {
            
            //console.log(value contains(term) );
                if (value.indexOf(term) !== -1) {
                    data = value.split('=');
                    data = data[1];
                }

            });

        return data;

    } // End : query

}; // End : App.Location
