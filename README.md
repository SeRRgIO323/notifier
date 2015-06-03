# jQuery notification plugin

Notifier is a tool that offers a nice and elegant way to add informational notifications on your webpages.

## How to use

To get started, download the plugin, unzip it and copy files to your website/application directory.
Load files in the <head> section of your HTML document. Make sure you also add the jQuery 2.x library.

    <head>
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/notifier/jquery.notifier.css" />
        <script type="text/javascript" src="/notifier/jquery.notifier.js"></script>
    </head>

Create notification window like this:

        $.notify({
            'message': 'Your message here'
        });

May also be passed an optional options object which will extend the default values. Example:

    $.notify({
        'vertical-align': 'bottom',
        'align': 'right',
        'hide-interval' : 2000,
        'message': 'Your message here',
        'afterClosed': function() {
            // Put your function here
        },
        'afterShowed': function() {
            // Put your function here
        }
    });
    
## Options

### vertical-align (string)

Vertical position of notification window. Can be 'top', 'middle' or 'bottom'.

### align (string)

Horizontal position of notification window. Can be 'left', 'center' or 'right'.

### hide-interval (int)

Amount of milliseconds after which notification window will disappear. If set to 0, notification window will disappear only after manual closing.

### message (string)

Message that will be shown in notification window

### afterShowed (function)

Event driven callback method, that occurs after notification window are showed on screen.

### afterClosed (function)

Event driven callback method, that occurs after notification window are disappeared from screen.