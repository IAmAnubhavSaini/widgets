(function ($, undefined) { //breadcrumbs
    function URLInfo(URLScheme, requiredPiece) { //helper function
      var scheme = URLScheme || /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      var partsOfURL = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
      var matches = scheme.exec(document.location.href);
      var piece;
      requiredPiece = requiredPiece || 'hash';
      switch(requiredPiece){
          case 'url'      : piece = matches[0]; break;
          case 'scheme'   : piece = matches[1]; break;
          case 'slash'    : piece = matches[2]; break;
          case 'host'     : piece = matches[3]; break;
          case 'port'     : piece = matches[4]; break;
          case 'path'     : piece = matches[5]; break;
          case 'query'    : piece = matches[6]; break;
          case 'hash'     : piece = matches[7]; break;
          case 'domain'   : piece = matches[1]+matches[2]+matches[3]+matches[4]; break;
          case 'all'      : piece = matches;    break;
      }
      return piece;
    };

    $.widget("anubhav.breadcrumbs", {
        options: {
            URLScheme: '/^(?:[A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::9\d+))?(?:\/)[^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/'
            ,   MinNumOfLinks: 1
            ,   InitialLink : '<li><a class="site-brand" href="/">home</a></li>'
            ,   InitialLinkClass : 'site-brand'
            ,   EscapeSubDirs : 'home,details'
            ,   Divider: '<span class="divider">/</span>'
        }
       , _create: function () {
            var self = this,
                container = self.element,
                options = self.options;
                UrlPieces = URLInfo(undefined,'path').split('/'),
                location = '',
                numLinks = options.MinNumOfLinks;
           var subDirectoriesToEscape = options.EscapeSubDirs !== '' ? options.EscapeSubDirs.split(',') : '';
           var areWeEscapingASubDir = true;
           var crumbSymbol = options.Divider;
           //adding initial link and first slash based on the following rules:
           //1. if there is no sub-dir, slash is not added
           //2. if first sub-dir is one of the esc-sub-dirs, slash is not added
           // why? : because first link cotains logo or brand name or site name already
           $(container).append(options.InitialLink);
           //this is complex rule : DO spend time on understanding it before altering it.
           areWeEscapingASubDir = self.IsSubDirEscapable(subDirectoriesToEscape, UrlPieces[0]);
           if((areWeEscapingASubDir === true && UrlPieces[1] != '' && UrlPieces[1] != undefined && UrlPieces[1] != null ) ||
              (UrlPieces[0] != '' && UrlPieces[0] != undefined && UrlPieces[0] != null))
           {
                $('.' + options.InitialLinkClass).parent().append(crumbSymbol);
           }
           
           //adding dynamically after addition of first / intial link which is also a brand / logo
            if(UrlPieces.length >=numLinks){
                $.each(UrlPieces, function(key, val){
                    location = location+ '/' +val;
                    if(self.IsSubDirEscapable(subDirectoriesToEscape, val)){
                        var _crumbLI = $('<li>');
                        var _crumbA  = $('<a>');
                        var _crumbSeparator = crumbSymbol;
                        _crumbA.attr('href', location);
                        _crumbA.append(val.toLowerCase());
                        _crumbLI.append(_crumbA);
                        if(key < UrlPieces.length -1){//#4
                            _crumbLI.append(_crumbSeparator);
                        }
                        container.append(_crumbLI);
                    }
                });
            }
           else{
              container.remove();
           }
       }

       ,IsSubDirEscapable: function(dirlist, valToCheck){
                var _requiredPiece = true;
                $.each(dirlist, function(key,val){
                    if(valToCheck.toLowerCase() === val.toLowerCase()) 
                    {
                        _requiredPiece = false;
                    }
                });
                return _requiredPiece;
            }

    });//widget ends
})(jQuery);//function ends
