/* AFL. read readme file at https://github.com/IAmAnubhavSaini/widgets/blob/master/README.md */
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
