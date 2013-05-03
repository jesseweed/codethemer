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

App.Nav = {

    html : {
        tabClass : 'ul.tabs',
        closeBtnImg : Location.url + 'img/icons/close-btn.png',
        closeBtnClass : 'tab-close',
        emptyPage : Location.url + 'render/empty'
    },

    bind : function() {

        var self = this;

        $$('li.file-name').addEvent('click', function(e) {
            console.log($(this).get('html'));
            self.openPage($(this).get('key'), $(this).get('html').split(' ').join(''));
        });

        // Set links for each tab
        $$('ul.tabs li').each(function(el){

            $(el).addEvent('click', function(e) {
                // location.href = $(this).get('href');
            });

        });

        // disable tab for current page
        if ( Location.segment(1) === 'render') {

            var el = $( Location.segment(2) );
            if (el) { el.addClass('active'); }

        }
        
        // Open folders on click
        $$('.folder-open').addEvent('click', function(e) {
            
            self.folderHide(this);

        });

        // Close folders on click
        $$('.folder').addEvent('click', function(e) {

            self.folderShow(this);

        });
        

    },

    fileList : function(key, name) {

        var self = this;

        // el = $(el);

        // el.removeClass('folder');
        // el.addClass('folder-open');
        // el.removeEvents();

        // $('open-files').hide();

        // $$('.nav-section').getChildren().each(function(el){
        $('open-files').getChildren().each(function(el){

            var li  = new Element("li", {
                id: key,
                href: Location.url + 'render/' + key
            }); 

            $('open-files').adopt(li);
            
            
        });


        $('open-files').adopt(li);

        // $(el).addEvent('click', function() { App.Nav.folderHide(el); })

        App.log('hide open files');

    },

    folderHide : function(el) {

        var self = this;

        el = $(el);

        el.addClass('folder');
        el.removeClass('folder-open');
        el.removeEvents();

        el.getSiblings('.file-name').each(function(el){
            $(el).hide();
        });

        $(el).addEvent('click', function() { App.Nav.folderShow(el); })

        App.log('close folder');

    },

    folderShow : function (el) {

        var self = this;

        el = $(el);

        el.removeClass('folder');
        el.addClass('folder-open');
        el.removeEvents();

        el.getSiblings('.file-name').each(function(el){
            $(el).show();
        });

        $(el).addEvent('click', function() { App.Nav.folderHide(el); })

        App.log('open folder');

    },

    init : function () {

        this.bind();
        
        // display tabs for all open pages
        this.openPages();

    },

    // save open pages to local storage
    setPages : function () {

        if ( Storage.get('pages') !== null) {
        
            var status,
                pages = new Array();

            $$('ul.tabs li').each(function(el){

                status = new Array($(el).get('key'));
                
                pages.append(status);

            });

            Storage.set('pages', pages);

        } else {}


        var li  = new Element("li", {
            html: name,
            id: key,
            href: Location.url + 'render/' + key
        }); 

        $$("ul.tabs").adopt(li); 

    },


    // add new page to open pages list & display tab
    openPage : function (key, name) {

        var pages = Storage.get('pages');

        // If other pages are open, append this to the list
        if (pages !== null && typeof page === 'undefined' && pages.indexOf(key) === -1) {

            console.log( pages.indexOf(key) );

            App.log('adding ' + name + ' to page list');

            Storage.set('pages', pages + ',' + key + ':' + name);

            this.tabCreate(key, name);
            this.fileAdd(key, name);
           
        // if this is the first page, create the page object in local storage
        } else if (pages === null) {

            App.log('opening ' + name + '. no other files open.');

            Storage.set('pages', key + ':' + name);
            this.tabCreate(key, name);
            this.fileAdd(key, name);

        }

        location.href = Location.url + 'render/' + key;

    },


    // open all current pages (if any)
    openPages : function () {

        var key, name,
            self = this,
            pages = Storage.get('pages');

        if ( pages !== null ) {

            pages = pages.split(',');

            pages.each(function(item, index){
                item = item.split(':');
                key = item[0];
                name = item[1];

                self.tabCreate(key, name);
                self.fileAdd(key, name);

            });

        }

        
        

    },

    closePage : function (which) {

        var pages = Storage.get('pages');

        if (pages.indexOf(',' + which) !== -1) {
            App.log('Close page: ' + which);
            Storage.set('pages', pages.split(',' + which).join(''));
        } else if (pages.indexOf(which + ',') !== -1) {
            App.log('Close page: ' + which);
            Storage.set('pages', pages.split(which + ',').join(''));
        }

        if ( Storage.get('pages')  === '' ) {
            Storage.remove('pages');
        }

    },


    tabCreate : function(key, name) {

        App.log('open tab: ' + name);

        var self = this;

        // create list item to add to open tabs list
        var li  = new Element("li", {
            id: 'tab-' + key,
            href: Location.url + 'render/' + key
        }); 

        var img  = new Element("img", {
            src: self.html.closeBtnImg,
            id: key + '-img',
        }); 

        img.addEvent('click', function(e) {
            console.log(e.target);
            self.tabDestroy(key, name);
            self.fileRemove(key, name);
        });

        img.addClass(this.html.closeBtnClass);

        li.addEvent('click', function(e) {

             if ( $(e.target).get('class').indexOf(self.html.closeBtnClass) === 0 ) {
                self.tabDestroy( key, name );
             } else {
                location.href = Location.url + 'render/' + key;
             }

        });
        

        $(li).adopt(img);

        $(li).set('html', ( $(li).get('html') + name ) );

        if ( App.Browser.page() === key ) li.addClass('active');

        $$(this.html.tabClass).adopt(li);


    },


    fileAdd : function (key, name) {

        var li  = new Element("li", {
            id: key + '-open-file',
            html: name,
            href: Location.url + 'render/' + key
        });

        li.addClass('file-name');
        li.addClass('tab1');

        $('open-files').adopt(li);

    },

    fileRemove : function (key, name) {

        $(key + '-open-file').destroy();


    },

    tabDestroy : function(key, name) {

        App.log('close tab: ' + key);

        var self = this,
            remove = key + ':' + name
            pages = Storage.get('pages');

        pages = pages.split(',' + remove).join(''),
        pages = pages.split(remove + ',').join(''),
        pages = pages.split(remove).join(''),
        last = pages.split(',').getLast(),
        last = last.split(':'),
        last = last[0];

        Storage.set('pages', pages);

        if ( Storage.get('pages')  === '' ) {
            Storage.remove('pages');
        }
        

        $(key).destroy();

        if ( typeof page === undefined || pages === null || pages === '' ) {
            
            location.href = this.html.emptyPage;

        } else {

            location.href = Location.url + 'render/' + last;

        }

    }



};

(function(){

/* = = = = = = = = = = = = = = = */
/* = 1. COOKIES  = = = = = = = = */
/* = = = = = = = = = = = = = = = */


    /* = = = = = = = = = = = = = = = = = #
    
    A. CONFIGURATION OPTIONS
    Set some default values
    
    # = = = = = = = = = = = = = = = = = */

    var Cookie = this.Cookie = {

    };


    /* = = = = = = = = = = = = = = = = = #
    
    B. COOKIE.DISPOSE
    Get rid of a cookie
    
    # = = = = = = = = = = = = = = = = = */

        Cookie.dispose = function(name) {
                
            var exdate=new Date(), value = '', expire = 3;
            exdate.setDate(exdate.getDate() - expire);
            var value=escape(value) + ((expire==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=name + "=" + value;

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    C. COOKIE.READ
    Get the value of a cookie
    
    # = = = = = = = = = = = = = = = = = */
    
        Cookie.read = function(name) {
                
            var value = "";
            var search = name + "=";
            
            if(document.cookie.length > 0) { 
                offset = document.cookie.indexOf(search);

                if (offset != -1) { 
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) end = document.cookie.length;
                    value = unescape(document.cookie.substring(offset, end));
                }
            }
                    
            return value;

        };

        // END FUNCTION

    
    /* = = = = = = = = = = = = = = = = = #
    
    D. COOKIE.WRITE
    Write data for a cookie
    
    # = = = = = = = = = = = = = = = = = */

        Cookie.write = function(name, value, expiration) {

            var expire = '',
            time = '';

            if(expiration != null) {

                expiration = expiration.toLowerCase();
                time = expiration.split(" ");
                time = time[0];
                            
                // Set expiration in days or hours
                if (expiration.indexOf('hours') > 0 || expiration.indexOf('hrs') > 0 ||
                    expiration.indexOf('hour') > 0  || expiration.indexOf('hr') > 0 ) {
                    expire = new Date((new Date()).getTime() + time * 3600000);
                } else if (expiration.indexOf('days') > 0 || expiration.indexOf('day') > 0) {
                    expire = new Date((new Date()).getTime() + time * 3600000 * 24);
                }
                            
                expire = "; expires=" + expire.toGMTString();
                document.cookie = name + "=" + escape(value) + expire;

            }

        };

        // END FUNCTION



/* = = = = = = = = = = = = = = = */
/* = 2. LOCAL STORAGE  = = = = = */
/* = = = = = = = = = = = = = = = */


    /* = = = = = = = = = = = = = = = = = #
    
    A. CONFIGURATION OPTIONS
    Set some default values
    
    # = = = = = = = = = = = = = = = = = */

        var Storage = this.Storage = {
            
            // Set some default values
            method : 'set',
            name : 'null',
            value : 'null',
            isAvailable : false,
            expiration : '30 days', // when to expire the fallback cookie

        };

        // END FUNCTION

    
    /* = = = = = = = = = = = = = = = = = #
    
    B. STORAGE.CHECK
    Check if local storage is available
    
    # = = = = = = = = = = = = = = = = = */

        Storage.check = function(name) {

            if (localStorage.getItem('storageTest')) {
                this.isAvailable = true;
            } else {

                localStorage.setItem('storageTest', true);
                
                if (localStorage.getItem('storageTest')) {
                    this.isAvailable = true;
                    localStorage.removeItem('storageTest');
                }
            }

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    C. STORAGE.CLEAR
    Clear everything in local storage
    
    # = = = = = = = = = = = = = = = = = */

        Storage.clear = function() {

            if (this.storage===true) localStorage.clear();

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    D. STORAGE.GET
    Get a stored value
    
    # = = = = = = = = = = = = = = = = = */

        Storage.get = function(name) {

            if (this.isAvailable === true) {
                return localStorage.getItem(name);
            } else {
                return cookie.read(name);
            }

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    E. STORAGE.REMOVE
    Get rid of a stored value
    
    # = = = = = = = = = = = = = = = = = */

        Storage.remove = function(name) {
            if (this.isAvailable === true) {
                localStorage.removeItem(name);
            } else {
                //this.Cookie.read(name);
            }

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    F. STORAGE.SET
    Store a value
    
    # = = = = = = = = = = = = = = = = = */

    
        Storage.set = function(name, value) {

            if (this.isAvailable === true) {
                localStorage.setItem(name, value);
            } else {
                Cookie.write(name, value, this.expiration);
            }

        };

        // END FUNCTION


    /* = = = = = = = = = = = = = = = = = = = = = = = = = = #
    
    A. RUN > STORAGE.CHECK
    Let's storage check to see if local storage is available
    
    # = = = = = = = = = = = = = = = = = = = = = = = = = = */

        Storage.check();

        // END FUNCTION

})();

// End of file Storage.js

App.Theme = {

    html : {
        editableClass : '.editable-region',
        colorText : 'text-picker',
        colorPicker : 'color-picker',
        attributeLabel : '.attribute-label'
    },

    bind : function () {

        var self = this;

        $$(this.html.editableClass).addClass('hover')
        
        $$(this.html.editableClass).addEvent('click', function(e) {

            var color = this.getStyle('color'),
                prop = this.get('attr')
                className = this.getStyle('color');
            
            console.log( prop + ': ' + color );

            self.setColor(prop, color);


        });
        
    },

    setColor : function (className, value) {

        var color = $(this.html.colorPicker),
            text = $(this.html.colorText);

        text.set('value', value);
        color.set('value', value);

        text.select();
        // color.click();

        var title = App.titleCase( className.split('-').join(' ') );
        $$(this.html.attributeLabel).set('html', title);

        color.removeEvents();
        text.removeEvents();


        text.addEvent('keyup', function(e) {

            if ( e.key == 'enter' ) {
                console.log('changing ' + className + ' to be ' + text.get('value'));
                $$('.' + className).setStyle('color', text.get('value') );

                text.blur();
            }

        });

        color.addEvent('change', function(e) {

            console.log('changing ' + className + ' to be ' + color.get('value'));
            $$('.' + className).setStyle('color', color.get('value') );
            text.set('value', color.get('value'));

            color.blur();

        });

    },

    init : function () {

        // App.log('theme.js loaded');
        this.bind();
        
    }

}
