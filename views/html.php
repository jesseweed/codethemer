<!DOCTYPE html>
<html lang="en-US">
<head>

    <meta charset="utf-8">

    <title>Page Title</title>

    <link rel="stylesheet" href="styles.css" />

    <script>

        App = {

            greeting : function ( say ) {
                
                var self = this
                    num = 2;
                
                $('header').set('html', say);

                console.log( 'set ' + say + ' as header.' );

            }
        }

        // THIS IS A JS COMMENT
        head.ready(function() {

            App.greeting('hello world');

        });

    </script>

</head>

<body>

    <!-- THIS IS AN HTML COMMENT -->

    <header>
        <h1 class="header">Greetings!</h1>
    </header>


</body>
</html>
