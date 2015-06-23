(function($, undefined) { //awesome header that works when the page is scrolled.
    "use strict";
    $.widget("anubhav.AwesomeHeader", {
        options: {
            unscrolledClass:'unscrolled-header'
            , scrolledClass: 'scrolled-header'
            , scrollPositionY: '100'
            , nextElement: 'div'
            , nextElementUnscrolledClass: 'awesome-header-next-unscrolled'
            , nextElementScrolledClass: 'awesome-header-next-scrolled'
        }
        , _create: function () {
            var _ref = this;
            var _header = _ref.element;
            var _opt = _ref.options;
            var _unscrolledClass = _opt.unscrolledClass;
            var _scrolledClass = _opt.scrolledClass;
            var _scrollPositionY = _opt.scrollPositionY > _header.height ? _header.height : _opt.scrollPositionY;
            var _nextEle = _opt.nextElement;
            var _nextElementUnscrolledClass = _opt.nextElementUnscrolledClass;
            var _nextElementScrolledClass = _opt.nextElementScrolledClass;

            $(window).bind('scroll', function () {
                if (window.scrollY > _scrollPositionY) {
                    $(_header).removeClass(_unscrolledClass).addClass(_scrolledClass);
                    $(_header).siblings(_nextEle).removeClass(_nextElementUnscrolledClass).addClass(_nextElementScrolledClass);
                }
                if (window.scrollY < _scrollPositionY) {
                    $(_header).addClass(_unscrolledClass).removeClass(_scrolledClass);
                    $(_header).siblings(_nextEle).removeClass(_nextElementScrolledClass).addClass(_nextElementUnscrolledClass);
                }
            });
        }
        , destroy: function () {
            $(window).unbind('scroll');
        }
    });
})(jQuery);