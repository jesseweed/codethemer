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
