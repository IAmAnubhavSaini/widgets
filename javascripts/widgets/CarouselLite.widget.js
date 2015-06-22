//Error should be that when adding css properties, values should have 'px' after them.
(function ($, undefined) { //twitter+bootstrap carousel lite
    $.widget("anubhav.TWBS_Carousel_lite", {
        options: {
            images: ''
            , minHeight: '400'
            , minWidth: '800'
            , height: '400'
            , width: '800'
            , class: 'center'
            , imageClass: 'img-polaroid'
        }
        , _create: function () {
            var _ref = this;
            var _height = _ref.options.height;
			if(_height.match('px') != null){
				_height = _height.replace('px','');
			}
            var _width = _ref.options.width;
			if(_width.match('px') != null){
				_width = _width.replace('px','');
			}
			var _minHeight = _ref.options.minHeight;
			if(_minHeight.match('px') != null){
				_minHeight = _minHeight.replace('px','');
			}
            var _minWidth = _ref.options.minWidth;
			if(_minWidth.match('px') != null){
				_minWidth = _minWidth.replace('px','');
			}
            var _container = _ref.element;
            var _containerID = $(_container).attr('id');
            var _CarouselInner = $('<div class="carousel-inner"></div>');
            
            
            $(_container).css({ 'min-height': _minHeight, 'min-width': _minWidth, 'height': _height, 'width': _width});
            _container.addClass(_ref.options.class);
            $.each(_ref.options.images.split(','), function (key, val) {
                var _item = '<div class="item"><img src="'+val+'" alt="Image : '+val+'" class="'+_ref.options.imageClass+'" height="'+_height+'" width="'+_width+'"/></div>';
                $(_CarouselInner).append(_item);
            });
            $(_container).append(_CarouselInner);
            $(_container).append('<a class="carousel-control left" href="#' + _containerID + '" data-slide="prev">&lsaquo;</a>');
            $(_container).append('<a class="carousel-control right" href="#' + _containerID + '" data-slide="next">&rsaquo;</a>');
            $(_container).carousel('next');
        }
        , destroy: function () {
            //since the code is pure CSS then I don't need any destruction or unbinding
        }

    });
})(jQuery);