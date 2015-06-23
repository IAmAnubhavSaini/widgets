(function ($, undefined) { //wonder select 
    "use strict";
    $.widget("anubhav.WonderSelect", {
        options: {
            select: ''
            , classString: 'WonderSelect normal'
        }
        ,
        _create: function () {
            var _ref = this;
            var _container = _ref.element;
            var _opt = _ref.options;
            var _selectElement = (_opt.select === '') ? $(_container).children('select')[0] : _opt.select;
            //hide element as soon as possible.
            $(_selectElement).hide();
            var _classString = _opt.classString;
            //var _nameSelect = $(_selectElement).attr('name');
            //var _idSelect = $(_selectElement).attr('id');
            //var _classSelect = $(_selectElement).attr('class');
            var _display = $('<div class="' + _classString + '"></div>');
            $(_container).append(_display);
            $.each($(_selectElement).children('option'), function (key, val) {
                console.log(key + " : " + $(val).val());
                $(_display).append('<div class="WonderSelect-items" data-key="' + key + '" data-val="' + $(val).val() + '">' + $(val).val() + '</div>');
            });
            //how many options are there: countOfItems
            var countOfItems = $(_display).children('div.WonderSelect-items').length;
            //overflow will cover other values, just make the height of the container equal to one WonderSelect-item
            var heightOfOneItem = $(_display).height() / countOfItems;
            $(_display).css('height', heightOfOneItem);
            //make first item active
            $($('div.WonderSelect-items')[0]).attr('data-active', 'active');

            $(_display).on('click', function () {
                var _elements = $(this).children('div.WonderSelect-item');
                var _elementsCount = _elements.length;
                var _currentVal = $(this).children('[data-active=active]').attr('data-val');
                //console.log(_currentVal);
                var _nextElement = $(this).children('[data-active=active]').next();
                _nextElement = (_nextElement === 'undefined') ? $($(this).children('.WonderSelect-item')[0]) : _nextElement;
                console.log(_nextElement);
                var _nextVal = _nextElement.attr('data-val');
                //console.log(_nextVal);
                $(this).css({ 'top': -1 * heightOfOneItem });
                $(this).children('[data-active=active]').attr('data-active', 'inactive');
                $(_nextElement).attr('data-active', 'active');
            });
        }
    });
})(jQuery);
