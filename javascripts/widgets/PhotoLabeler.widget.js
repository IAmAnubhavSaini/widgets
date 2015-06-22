function($, undefined){ //Photo labeler
    $.widget("anubhav.photolabeler",{
    //usage example 
    //$('.photolabeler').photolabeler({ Pos:'absolute', LabelPosXName: 'right', LabelPosX: '100px' });
        options:    {
            NameInPhoto:    ''
           ,LabelClasses:   'label'
           ,LabelElement:   'div'
           ,LabelPosYName: 'bottom'
           ,LabelPosXName: 'left'
           ,LabelPosY: '0px'
           ,LabelPosX: '0px'
           ,LabelZIndex: 100
           ,Pos: 'static'
        }
        ,
        _create : function(){
            var _ref = this;
            var _container = _ref.element;
            var _nameInPhoto = _ref.options.NameInPhoto;
            var _class = _ref.options.LabelClasses;
            var _label = _ref.options.LabelElement;
            var _lblPosX = _ref.options.LabelPosX;
            var _lblPosY = _ref.options.LabelPosY;
            var _lblPosXName = _ref.options.LabelPosXName;
            var _lblPosYName = _ref.options.LabelPosYName;
            var _zindex = _ref.options.LabelZIndex;
            var _pos = _ref.options.Pos;

            var _nameFromDataAttr = _container.children('img').attr('data-nameinphoto');
            _nameInPhoto = (_nameFromDataAttr != '' || _nameFromDataAttr != null || _nameFromDataAttr != undefined) ? _nameFromDataAttr : _nameInPhoto;
            //console.log(_nameInPhoto);
            
            _label = '<'+_label+' class="'+_class+'" style="position:'+_pos+';'+_lblPosXName+':'+ _lblPosX + ';'+_lblPosYName+':'+ _lblPosY + '; z-index:'+ _zindex + '">'+_nameInPhoto+'</'+_label+'>';
            
            $(_label).addClass(_class);
            //positioning
            $(_container).css({'position': 'relative'});
            _container.append($(_label));

            


        }//_create function ends 
    });
})(jQuery);
