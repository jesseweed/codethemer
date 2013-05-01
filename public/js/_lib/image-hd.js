/* 

  = = = = = = = = = = = = = =
  = ABOUT = = = = = = = = = =
  = = = = = = = = = = = = = =

    SCRIPT : image-hd.js

    NAME : Image HD
    
    DESCRIPTION: Javascript library for working with hi-res images (retina, hdpi, etc.)

    LICENSE: MIT-style license
    
    AUTHORS :
      - Jesse Weed

  = = = = = = = = = = = = = =
  = TABLE OF CONTENTS = = = =
  = = = = = = = = = = = = = =

    1. CONFIGURATION OPTIONS

    2. DENSITY

    3. LOGGING

    4. PLATFORM

    5. TYPE

    6. RUN

    7. AUTO LOAD


  = = = = = = = = = = = = = =
  = = = = = = = = = = = = = =


*/


// = = = = = = = = = = = = =
// 1. CONFIGURATION OPTIONS
// = = = = = = = = = = = = =

  ImageHD = {
    
    class_name : false, // set a class name to only update images with given class, otherwise set to false
    method : 'auto', // 'dir' => get same image name from this dir | 'append' => append to image name in same dir || 'auto' => uses dir for android & append for ios
    set_dimensions : true, // set explicit width/height to prevent img enlargement when not set
    android_dir_append : '', // ex: "drawble-" => "drawable-hdpi" || '' => 'hdpi'
    ios_dir_append : '',
    android : { // which andoird densities to target
      xhdpi : true,
      hdpi : true,
      mdpi : true,
      ldpi : false,
    },
    retina_droid : true, // if true we will serve @2x images to XHDPI devices and ignore the rest

    autoload : false, // true => will call ImageHD.run as soon as dom has loaded
    debug : false, // set true to log what's happening in the console

  }

  // = = = = = =
  // End config
  // = = = = = =


// = = = = = = = = = = = = = = = = =
// 2. DENSITY  -  Get screen density
// = = = = = = = = = = = = = = = = =

  ImageHD.density = function() {

    var platform = this.platform(),
        dpi = 'standard', // assume unknown dpi until we find otherwise
        res = window.devicePixelRatio; // device pixel ratio

    // Android
    if (platform === 'android' && this.retina_droid === false) {
      if (this.method === 'auto') this.method = 'dir';
      if (res > 1) dpi = 'xhdpi'; // XHDPI
      else if (res == 1.5) dpi = 'hdpi';  // HDPI
      else if (res == 1) dpi = 'mdpi';  // MDPI
      else if (res == 0.75) dpi = 'ldpi';  // LDPI
    // iOS
    } else if (platform === 'ios' || platform === 'mac' || this.retina_droid === true) {
      if (this.method === 'auto') this.method = 'append';
      if (res > 1) dpi = 'retina'; // RETINA
    }

    if (this.debug === true) this.log('current device density: ' + dpi); // log density

    return dpi; // and we're done

  }

    // = = = = = =
    // End DENSITY
    // = = = = = =


// = = =  = = = = = = = = = = = = = = = = = =
// 3. LOG  -  Abstract logging functionality
// = = =  = = = = = = = = = = = = = = = = = =
  
  ImageHD.log = function(what) {
    if (typeof console !== "undefined") {
      console.log(what);
    }
  }

  // = = = =
  // End LOG
  // = = = =


// = = =  = = = = = = = = = = = = = = = = =
// 4. PLATFORM  -  determine platform type
// = = =  = = = = = = = = = = = = = = = = =
  
  ImageHD.platform = function() {

    var ua = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    var name = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];

    if (this.debug === true) this.log('platform: ' + name); // log platform

    return name;

  },

  // = = = = = = =
  // End PLATFORM
  // = = = = = = =


// = = =  = = = = = = = = = = = = = = = = = = = =
// 5. RUN  -  replace images with correct density
// = = =  = = = = = = = = = = = = = = = = = = = =

  ImageHD.run = function() {

    var type = this.type(),
        density = this.density(),
        platform = this.platform();

    if (density !== 'standard') {

      // replace all images
      if (this.class_name === false) {
        var el = document.getElementsByTagName('img');
      // or just get images that match our class
      } else {
        var el = document.getElementsByClassName(this.class_name);
      }

      // loop through images
      for (var i=0, im=el.length; im>i; i++) {

        var img = el[i],
            src = img.src,
            name = img.src.split('/').pop(),  
            ext = src.split('.').pop();

            if (this.method === 'dir') new_src = src.split(name).join(type + '/' + name);
            if (this.method === 'append') new_src = src.split('.' + ext).join(type + '.' + ext);

        // update source
        if (new_src !== null && new_src !== 'undefined') {

          if (this.set_dimensions === true) {
            el[i].width = el[i].width;
            el[i].height = el[i].height;
          }
          el[i].src = new_src;
          if (this.debug === true) this.log(src + ' replaced with ' + new_src);
        }

      }

    }

  }

  // = = = =
  // End RUN
  // = = = =


 // = = =  = = = = = = = = = = = = = = = = = =
// 6. TYPE  -  determine image naming schemes
// = = =  = = = = = = = = = = = = = = = = = =

  ImageHD.type = function() {

    var density = this.density(),
        platform = this.platform(),
        type = null;
    
    if (platform === 'android') {
      if (this.method === 'auto') this.method = 'dir';
      type = this.android_dir_append + density;

    } else if (density > 1 && platform === 'ios' || platform === 'mac') {
      type = this.ios_dir_append + this.method;
      if (this.method === 'auto') this.method = 'append';
      type = '@2x';
    }
    
    return type;

  }

  // = = = = =
  // End TYPE
  // = = = = =


// = = =  = = = = = = = = = = = = = = = = = = = = = = = = = =
// 7. AUTOLOAD  -  call ImageHD.run as soon as dom has loaded
// = = =  = = = = = = = = = = = = = = = = = = = = = = = = = =

  if (ImageHD.autoload === true) {
    window.onload = function() {
      ImageHD.run();
    };
  }

  // = = = = = = =
  // End AUTOLOAD
  // = = = = = = =