/*jshint camelcase: true, curly: true, eqeqeq: true, latedef: false, undef: false, strict: true */

// define variables
var App, console, Nav,
    host = location.protocol + '//' + location.host + '/';

// load scripts    
head.js(host + 'js/_lib/mootools/core.js');
head.js(host + 'js/_lib/mootools/more.js');
head.js(host + 'js/_lib/xml2json.js');
head.js(host + 'js/_lib/image-hd.js');
head.js(host + 'js/_lib/spin.min.js');

head.ready(function() {

   App.init();

   var colors = App.getTheme(theme);
   App.applyTheme( colors ); // extract data from theme object
   

});

// Main App class
App = {

    applyTheme : function (theme) {

        console.log( theme );

        var bg = theme.base.background.value;

        $$('.code').setStyle('background-color', theme.base.background.value);
        $$('.content').setStyle('background-color', theme.base.background.value);

        $$('.tabs li').setStyle('background-color', theme.base.foreground.value);
        $$('.tabs li').setStyle('color', theme.base.background.value);

        $$('.tabs li.active').setStyle('background-color', theme.base.background.value);
        $$('.tabs li.active').setStyle('color', theme.base.foreground.value);

        $$('.code').setStyle('color', theme.base.foreground.value);
        $$('.foreground').setStyle('color', theme.base.foreground.value);

        $$('.attribute').setStyle('color', theme.attributes['entity.other.attribute-name'].value[1]);
        $$('.string').setStyle('color', theme.attributes.string.value[0]);

        $$('.keyword').setStyle('color', theme.attributes.keyword.value[0]);

        $$('.function-argument').setStyle('color', theme.attributes['variable.parameter'].value[1] );
        $$('.function-name').setStyle('color', theme.attributes['entity.name.function'].value[1] );

        $$('.support-function').setStyle('color', theme.attributes['support.function'].value[1] );

        $$('.storage-type').setStyle('color', theme.attributes['storage.type'].value[1] );

        $$('.number').setStyle('color', theme.attributes['constant.numeric'].value[0] );





        // console.log( theme.attributes['constant.numeric'].value[0] );


        $$('.comment').setStyle('color', theme.attributes.comment.value);

        $$('.tag').setStyle('font-style', theme.attributes['entity.name.tag'].value[0]);
        $$('.tag').setStyle('color', theme.attributes['entity.name.tag'].value[1]);

        // console.log( theme.attributes['entity.name.tag'].value[1]);

    },

    attributeProperty : function (data, index) {

        var data = data[index],
            property = {},
            value = {};

        var i = 0;

        Array.each(data.dict[0].key, function( data2, index ){
            property[i] = data2;
            i++;
        });

        i = 0;

        Array.each(data.dict[0].string, function( data2, index ){

            if (typeof data2 === 'object') {
                value[i] = '';
            } else {
                value[i] = data2;
            }

            i++;
        });

        var item = {
            name : data.string[0],
            scope : data.string[1],
            property : property,
            value : value
        };

        return item;

    },

    baseProperty : function (data, index) {

        // console.log(data);

        var item = {
            property : data.key[index],
            value : data.string[index]
        };

        return item;

    },

    getTheme : function ( theme_data ) {

        var self = this,
            id
            obj = {},
            base = {}, // default colors
            items = {}; // override for specific attributes

        var theme_name = theme_data.plist.dict[0].string[0];
        var json = theme_data.plist.dict[0].array[0].dict; // dive down to where color settings are

        // get base theme colors
        Array.each(json[0].dict, function( data, index ){

            Array.each(data.key, function( data2, index ){
                base[ data.key[index] ] = self.baseProperty(data, index);
            });

        });
           
        // self.attributeProperty(json, 12);

        // get colors for specific attributes
        Array.each(json, function( data, index ){
            if (index !== 0) items[ data.string[1] ] = self.attributeProperty(json, index);
        });


        var output = {
            name: theme_name,
            base: base,
            attributes: items
        };

        return output;        

    },

    // Changes XML to JSON
    xmlToJson : function (xml) {
        var attr,
            child,
            attrs = xml.attributes,
            children = xml.childNodes,
            key = xml.nodeType,
            obj = {},
            i = -1;

        if (key == 1 && attrs.length) {
          obj[key = '@attributes'] = {};
          while (attr = attrs.item(++i)) {
            obj[key][attr.nodeName] = attr.nodeValue;
          }
          i = -1;
        } else if (key == 3) {
          obj = xml.nodeValue;
        }
        while (child = children.item(++i)) {
          key = child.nodeName;
          if (obj.hasOwnProperty(key)) {
            if (obj.toString.call(obj[key]) != '[object Array]') {
              obj[key] = [obj[key]];
            }
            obj[key].push(xmlToJson(child));
          }
          else {
            obj[key] = xmlToJson(child);
          }
        }
        return obj;
    },



    theme : function() {

        var self = this;

            // var xml2json = new XML2Object();

            // // xml2json.convertFromUrl('../themes/Github.tmTheme', function() {}fn[, options[, id]]);

            //  xml2json.convertFromURL('../themes/Github.tmTheme', function(response) {
            //     console.log(xml);
            // });
        
            //prevent the page from changing
            // event.stop();
            //make the ajax call, replace text
            var req = new Request.HTML({
                method: 'get',
                url: '../themes/Github.tmTheme',
                // data: { 'do' : '1' },
                onRequest: function() {
                    // alert('Request made. Please wait...');
                },
                // update: $('message-here'),
                onComplete: function(responseText, responseXML) {
                    
                    // App.log(responseText);
                    // App.log(responseXML);


                    // var xml = responseText[4];
                    var xml = responseText;
                    
                    // var json = self.xmlToJson(xml);

                    var json = X2JS.xml_str2json( xml );

                    // console.log(json);

                        // console.log(key);

                        // alert('name:' + day + ', index: ' + index);
                    // }); // alerts 'name: Sun, index: 0', 'name: Mon, index: 1', etc.


                }
            }).send();
        

        

    },

    debug : true,

    // Tie logging to debug flag
    log : function (what) {

        "use strict";

        if (typeof console !== "undefined" && this.debug === true) {
            console.log(what);
        }
    },

    init : function() {

        App.Nav.init();
        App.Theme.init();
        
    },

    titleCase : function(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
