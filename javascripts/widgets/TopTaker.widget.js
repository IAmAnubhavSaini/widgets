(function ($, undefined) { //top taker
    $.widget("anubhav.TopTaker", {
        options: {
            theme: ''
            , text: 'TOP'
            , hiddenClass: 'hide-top-taker'
            , positionClass: 'fixpos'
            , cursorClass: 'pointer'
            , scrollPositionY: '100'
			, imageElement: '<i class="icon"></i>'
            , iconClass: 'icon-arrow-up'
        }
        , _create: function () {
            var self = this,
                container = self.element,
                options = self.options,
                theme = options.theme,
                iconClass = options.iconClass,
                text = options.text,
                imageElement = '',
                themeString = '';

            themeString = theme !== '' ? 'top-taker-' + theme : '';
            imageElement = $(self.options.imageElement).addClass(iconClass).css('margin','0 2px 0 0');
			//using themeString here
			var OurEle = $('<div class="top-taker '+themeString+ '"></div>')
                            .addClass(self.options.hiddenClass)
                            .addClass(self.options.positionClass)
                            .addClass(self.options.cursorClass);

            $(OurEle).append(imageElement).append(text);

            $(container).append(OurEle);

            $(OurEle).bind('click', function () {
                window.scrollTo(0, 0);
            });

            $(window).bind('scroll', function () {
                if (window.scrollY > self.options.scrollPositionY) {
                    $(OurEle).removeClass(self.options.hiddenClass);
                }
                if (window.scrollY < self.options.scrollPositionY) {
                    $(OurEle).addClass(self.options.hiddenClass);
                }
            });
        }
        , destroy: function () {
            $(OurEle).unbind('click');
            $(window).unbind('scroll');
        }
    });
})(jQuery);