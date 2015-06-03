$.notify = function(options) {
    var $disturbing;

    var settings = $.extend({
        'vertical-align': 'top',
        'align' : 'left',
        'hide-interval': '0',
        'message': 'text',

        'afterClosed' : function(){},
        'afterShowed' : function(){}
    }, options);


    var deleteSticker = function ($sticker){
        $sticker.remove();
        settings['afterClosed']();
    };

    var closeSticker = function ($sticker){
        $sticker.fadeOut(200, function(){
            deleteSticker($sticker);
        });
    };

    var centerBlock = function ($container){
        var top_position = $(window).height() / 2 - $container.height() / 2;
        $container.css({top: top_position});
    };

    var isIntersects = function($element_1, $element_2) {
        if(
            $element_1.length != 0 && $element_2.length != 0 &&
            !$element_1.is(':empty') && !$element_2.is(':empty')
        ) {
            if(
                $element_1.offset().top < $element_2.offset().top &&
                ($element_1.offset().top + $element_1.height()) > $element_2.offset().top
            ) {
                return true;
            }

            if(
                $element_2.offset().top < $element_1.offset().top &&
                ($element_2.offset().top + $element_2.height()) > $element_1.offset().top
            ) {
                return true;
            }
        }
        return false;
    };

    var removeLastSticker = function($container){
        if($container.hasClass('top-container')){
            deleteSticker($container.find("div:first-child"));
        }
        if($container.hasClass('bottom-container')){
            deleteSticker($container.find("div:last-child"));
        }
        if($container.hasClass('middle-container')){
            deleteSticker($container.find("div:first-child"));
            centerBlock($container);
        }
    };

    var findIntersectBlock = function($active_block, align) {
        var $top_container = $('#top-' + align + '-container');
        var $bottom_container = $('#bottom-' + align + '-container');
        var $middle_container = $('#middle-' + align + '-container');

        if($active_block.hasClass("top-container")){
            if(
                $top_container.offset().top + $top_container.height() >
                $(window).height() + $(window).scrollTop()
            ){
                return $top_container;
            }
            else if(isIntersects($top_container, $bottom_container)){
                return $bottom_container;
            }
            else if(isIntersects($top_container, $middle_container)){
                return $middle_container;
            }
            else{
                return false;
            }
        } else if($active_block.hasClass("bottom-container")) {
            if($bottom_container.offset().top < $(window).scrollTop()){
                return $bottom_container;
            }
            else if(isIntersects($bottom_container, $top_container)){
                return $top_container;
            }
            else if(isIntersects($bottom_container, $middle_container)){
                return $middle_container;
            }
            else{
                return false;
            }
        } else if($active_block.hasClass("middle-container")) {
            if(
                $middle_container.offset().top < $(window).scrollTop() ||
                ($middle_container.offset().top + $middle_container.height()) > ($(window).height() + $(window).scrollTop())
            ){
                return $middle_container;
            }
            else if(isIntersects($middle_container, $top_container)){
                return $top_container;
            }
            else if(isIntersects($middle_container, $bottom_container)){
                return $bottom_container;
            }
            else{
                return false;
            }
        }
        return false;
    };

    var container_id = settings['vertical-align'] + '-' +
                       settings['align'] + '-container';
    var $container = $('#' + container_id);
    if($container.length == 0) {
        $('body').prepend(
            '<div id="' + container_id + '" class="sticker-container '+
            settings['vertical-align']+'-container '+
            settings['align']+'-container"></div>'
        );
        $container = $('#' + container_id);

        var max_width = $(window).width() / 3 - 10;
        $container.css({maxWidth:max_width});

        if(settings['align']=='center'){
            var position = $(window).width() / 2 - $container.width() / 2;
            $container.css({left:position});
        }
    }

    var $sticker = $(
        '<div class="sticker">' +
            '<p class="sticker-close-button"></p>' +
            '<p class="sticker-message">'+settings['message']+'</p>' +
        '</div>'
    );

    $sticker.find(".sticker-close-button").bind("click",function(){
        closeSticker($sticker)
    });

    switch(settings['vertical-align']) {
    case 'top':
        $container.append($sticker);
        break;
    case 'bottom':
        $container.prepend($sticker);
        break;
    case 'middle':
        $container.append($sticker);
        centerBlock($container);
        break;
    default :
    }

    while($disturbing = findIntersectBlock($container, settings['align'])) {
        removeLastSticker($disturbing);
    }

    settings['afterShowed']();
    if(!isNaN(+settings['hide-interval']) && +settings['hide-interval'] != 0) {
        setTimeout(function() {
            closeSticker($sticker);
        }, settings['hide-interval']);
    }
};