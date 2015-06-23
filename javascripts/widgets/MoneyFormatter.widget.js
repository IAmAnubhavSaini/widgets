(function(){
    "use strict";
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
    (function($, undefined) { //money formatter
        $.widget("anubhav.MoneyFormatter", {
            options: {
                currencySymbol: "\u20B9"
                ,separatorSymbol: ','
                ,distance: '2'
                ,decimalSymbol: '.'
            }
            ,
            _create: function() {
                var _me = this;
                var _ele = _me.element;
                var _opt = _me.options;
                var _sym = _opt.currencySymbol;
                var _sepSym = _opt.separatorSymbol;
                var _d = _opt.distance;					//distance between digits for separator
                var _decSym = _opt.decimalSymbol;
                var _ModifiedValue = '';
                $(_ele).bind('blur', function() {
                    var _val = $(this).val();
    				_val = Clean(_val);
                    if (isFinite(_val) && _val !== '') {
                        //console.log(_val);
                        //alert(Set(_val, _sepSym, _d));//don't _d+1 'coz, _d+1 is string
    					var _convertedString = Set(_val, _sepSym, _d);
    					$(this).val(_sym +' '+ _convertedString);
                    }
                });
    			$(_ele).bind('focus', function(){
    				var _val = $(this).val();
    				var _cleanString = Clean(_val);
    				$(this).val(_cleanString);
    			});
            }
            ,
            _destroy: function() {
            }
        });
    })(jQuery);
})();