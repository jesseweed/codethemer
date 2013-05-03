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
