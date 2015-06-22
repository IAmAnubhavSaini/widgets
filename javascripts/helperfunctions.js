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

/* helper functions for MoneyFormatter*/
function Set(numberString, separator, distance) {
    var isInitialSet = false;
    var i = 0;
    var newReversedNumberString = '';
    var significantPart = ''; //on the left of the decimal in actual non reversed number
    var decimalPart = ''; //on the right of the decimal in actual non reversed number
	var isNegative = (numberString.indexOf('-') > -1) ? true : false;
    var reversedNumberString = Reverse(numberString.replace('-',''));
	//console.log(distance);
    //console.log('revesed number string : ' + reversedNumberString);
    if (reversedNumberString.indexOf('.') > -1 ) {
        significantPart =  reversedNumberString.substr(reversedNumberString.indexOf('.') + 1);
        decimalPart =  reversedNumberString.substr(0, reversedNumberString.indexOf('.') + 1);
		//console.log(significantPart);
		//console.log(decimalPart);
    }
	else{
		significantPart = reversedNumberString;
		//console.log(significantPart);
	}
    //console.log('received: ' + reversedNumberString);
    for (; i < significantPart.length; i++) {
        //console.log(significantPart.charAt(i) + '\n');
        
        if (i % 3 === 0 && i > 2 && !isInitialSet) {
            //console.log('i%3 is true');
            newReversedNumberString += separator;
            newReversedNumberString += significantPart.charAt(i);
            isInitialSet = true;
        } 
        else if ((i - 3) % distance === 0 && i > 4) {
            //console.log('i%2 is true');
            newReversedNumberString += separator;
            newReversedNumberString += significantPart.charAt(i);
        } 
        else {
            //console.log('else is true');
            newReversedNumberString += significantPart.charAt(i);
        }
    }
    //console.log(newReversedNumberString);
    newReversedNumberString = Reverse(newReversedNumberString);
    newReversedNumberString = newReversedNumberString.concat(Reverse(decimalPart));
	newReversedNumberString = (isNegative === true) ? '- '+newReversedNumberString : '+ '+newReversedNumberString;
    return newReversedNumberString;
}
function Reverse(numberString) {
    var newNumberString = '';
    for (var i = numberString.length - 1; i >= 0; i--) {
        newNumberString += numberString.charAt(i);
    }
    return newNumberString;
}
function Clean(numberString) {
	var _i = 0;
	var newCleanString = '';
	var isNegative = (numberString.indexOf('-') > -1) ? true : false;
	var C = '';
	while(_i <numberString.length){
		C = numberString.charAt(_i);
		if( isDigit(C) || C === '.' ){
			newCleanString += C;
		} 
		_i++;
	}
	newCleanString = (isNegative === true) ? '-'+ newCleanString : newCleanString;
	return newCleanString;
}
function isDigit(Ch){
	if( Ch>='0' && Ch<='9' )return true;
	else return false;
}


function ScriptLoader(ArraySRC){
  if(ArraySRC === undefined) 
    ArraySRC = ["./scripts/jquery-1.9.1.min.js","./scripts/bootstrap.min.js","./scripts/traffoon-functions-0.0.1.js", "./scripts/anubhav.functions.js"];//,"./scripts/knockout-2.2.1.js"];
  for(var src in ArraySRC){
    var script = document.createElement('script');
    script.src = src;
    script.type= 'text/javascript';
    document.getElementsByTagName('head').appendChild(script);
  }
}