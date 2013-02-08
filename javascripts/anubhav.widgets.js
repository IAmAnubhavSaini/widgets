﻿(function ($, undefined) { //top taker
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
			var _OurEle = $('<div class="top-taker '+_themeString '"></div>')
                            .addClass(_ref.options.hiddenClass)
                            .addClass(_ref.options.positionClass)
                            .addClass(_ref.options.cursorClass);

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

(function ($, undefined) { //twitter+bootstrap carousel lite
    $.widget("anubhav.TWBS_Carousel_lite", {
        options: {
            images: ''
            , minHeight: '400px'
            , minWidth: '800px'
            , height: '400px'
            , width: '800px'
            , class: 'center'
            , imageClass: 'img-polaroid'
        }
        , _create: function () {
            var _ref = this;
            var _height = _ref.options.height;
            var _width = _ref.options.width;
            var _container = _ref.element;
            var _containerID = $(_container).attr('id');
            var _CarouselInner = $('<div class="carousel-inner"></div>');
            
            
            $(_container).css({ 'min-height': _ref.options.minHeight, 'min-width': _ref.options.minWidth, 'height': _height, 'width': _width});
            _container.addClass(_ref.options.class);
            $.each(_ref.options.images.split(','), function (key, val) {
                var _item = '<div class="item"><img src="'+val+'" alt="Image : '+val+'" class="'+_ref.options.imageClass+'" height="'+_height.replace("px","")+'" width="'+_width.replace("px","")+'"/></div>';
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

function URLInfo(URLScheme, retval) { //helper function
    var _scheme = URLScheme || /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var _retval = retval || 'hash';
    var _names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
    var _url = document.location.href;
    var _result = _scheme.exec(_url);
    var _ret;
    switch(_retval){
        case 'url'      : _ret = _result[0]; break;
        case 'scheme'   : _ret = _result[1]; break;
        case 'slash'    : _ret = _result[2]; break;
        case 'host'     : _ret = _result[3]; break;
        case 'port'     : _ret = _result[4]; break;
        case 'path'     : _ret = _result[5]; break;
        case 'query'    : _ret = _result[6]; break;
        case 'hash'     : _ret = _result[7]; break;
        case 'all'      : _ret = _result;    break;
        case 'domain'   : _ret = _result[1]
                                +_result[2]
                                +_result[3]
                                +_result[4]; break;
    }
    return _ret;
}

(function ($, undefined) { //breadcrumbs
    $.widget("anubhav.breadcrumbs", {
        options: {
            URLScheme: '/^(?:[A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::9\d+))?(?:\/)[^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/'
            ,   MinNumOfLinks: 1
            ,   InitialLink : '<li><a class="site-brand" href="/">KRN Institute of Technology</a></li>'
            ,   InitialLinkClass : 'site-brand'
            ,   EscapeSubDirs : 'home,details'
            ,   Divider: '<span class="divider">/</span>'
        }
       , _create: function () {
           var _ref = this;
           var _container = _ref.element;
           var _url = document.location.href;
           var _path = URLInfo(undefined,'path');
           var _pieces = _path.split('/');
           var _location = '';
           var _numOfLinks = _ref.options.MinNumOfLinks >=1 ? _ref.options.MinNumOfLinks : 1;
           var _initialLink = _ref.options.InitialLink;
           var _initialLinkClass = '.'+_ref.options.InitialLinkClass;
           var _escapeSubDirs = _ref.options.EscapeSubDirs.split(',');
           var _STATE_escSubDirs = true;
           var _divider = _ref.options.Divider;
           //adding initial link and first slash based on the following rules:
           //1. if there is no sub-dir, slash is not added
           //2. if first sub-dir is one of the esc-sub-dirs, slash is not added
           // where esc-sub-dirs is list of escapable sub directories 
           //       example /home/ for /home/index , /home/about or /details/ if there is no /details/ present
           // why? : because first link cotains logo or brand name or site name already
           $(_container).append(_initialLink);
           //this is complex rule : DO spend time on understanding it before altering it.
           _STATE_escSubDirs = _ref._IsEscapableSubDir(_escapeSubDirs, _pieces[0]);
      //     console.log(_STATE_escSubDirs);
           if((_STATE_escSubDirs === true && _pieces[1] != '' && _pieces[1] != undefined && _pieces[1] != null ) ||(_pieces[0] != '' && _pieces[0] != undefined && _pieces[0] != null)){
              //because li-> a AND li->span.divider => li->(a+span.divider)
              $(_initialLinkClass).parent().append(_divider);
           }
           
           //adding dynamically after addition of first / intial link which is also a brand / logo
           if(_pieces.length >=_numOfLinks){//#1
               $.each(_pieces, function(key, val){//#2
  //                  console.log(key+" key val "+val);
                    _location = _location+ '/' +val;
    //                console.log(_location);
                if(_ref._IsEscapableSubDir(_escapeSubDirs, val)){//#3
                    var _crumbLI = $('<li>');
                    var _crumbA  = $('<a>');
                    var _crumbSeparator = _divider;
                    _crumbA.attr('href', _location);
                    _crumbA.append(val);
                    _crumbLI.append(_crumbA);
                    if(key < _pieces.length -1){//#4
                        _crumbLI.append(_crumbSeparator);
                    }
                    _container.append(_crumbLI);
                }//inner if ends #3
               });//each ends #2
               $(_container).addClass('inl');
           }
           else{
              _container.remove();
           }
       }
       ,    _IsEscapableSubDir: function(dirlist, valToCheck){
                var _retVal = true;
                $.each(dirlist, function(key,val){
//                console.log("key val valtocheck "+key +" "+val+" "+valToCheck);
                    if(valToCheck.toLowerCase() == val.toLowerCase()) 
                    {
                        _retVal = false;
                    }
                });//each ends
                return _retVal;
            }

    });//widget ends
})(jQuery);//function ends

(function($, undefined){ //Photo labeler
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