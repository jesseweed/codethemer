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
