(function ($, undefined) { //top taker
    $.widget("anubhav.TopTaker", {
        options: {
            theme: ''
            , text: 'TOP'
            , hiddenClass: 'hid'
            , positionClass: 'fixpos'
            , cursorClass: 'pointer'
            , scrollPositionY: '100'
			, imageElement: '<i class="icon"></i>'
            , iconClass: 'icon-arrow-up'
        }
        , _create: function () {
            var _ref = this;
            var _container = _ref.element;
            var _opt = _ref.options;
            var _theme = _ref.options.theme;
            var _iconClass = _ref.options.iconClass;
            
            var _text = _ref.options.text;
            var _imageElement;
			var _themeString = '';
            if (_theme != '') {
				_themeString = 'top-taker-' + _theme;
                _imageElement = '<i class="icon ' +_iconClass +'-'+ _theme + '"></i>' + _text;
            }
            else {
				_themeString = ''; //explicitely defined.
                _imageElement = _ref.options.imageElement + _text;
            }
			//using _themeString here
			var _OurEle = $('<div class="top-taker '+_themeString+ '"></div>').addClass(_ref.options.hiddenClass).addClass(_ref.options.positionClass).addClass(_ref.options.cursorClass);

            $(_OurEle).append(_imageElement);

            $(_container).append(_OurEle);

            $(_OurEle).bind('click', function () {
                window.scrollTo(0, 0);
            });

            $(window).bind('scroll', function () {
                if (window.scrollY > _ref.options.scrollPositionY) {
                    $(_OurEle).removeClass(_ref.options.hiddenClass);
                }
                if (window.scrollY < _ref.options.scrollPositionY) {
                    $(_OurEle).addClass(_ref.options.hiddenClass);
                }
            });
        }
        , destroy: function () {
            $(_OurEle).unbind('click');
            $(window).unbind('scroll');
        }
    });
})(jQuery);