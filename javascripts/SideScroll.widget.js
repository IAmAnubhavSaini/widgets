(function($, undefined){
	$.widget("anubhav.SideScroll",{
		options:{
			dataBoxStyleClassesString: ''
		,	scrollElement: 'body'
		}
		,
		_create: function(){
			var _me = this;
			var _classString = _me.options.dataBoxStyleClassesString;
			var _element = _me.element;
			var _scrollElement = _me.options.scrollElement;
			
			console.log(_element);
			$(_element).on('mousewheel',function(event){ 
			
				var delta = event.originalEvent.wheelDelta;
				if(delta < 0){
				//console.log('delta < 0 i.e. scrolling down or right.'); 
					$(_scrollElement).scrollLeft($(_scrollElement).scrollLeft() + parseInt(delta)*-1); 
					event.preventDefault();
				}
				else {
				//console.log('delta > 0 i.e. scrolling up or left.'); 
					$(_scrollElement).scrollLeft($(_scrollElement).scrollLeft() + (parseInt(delta)*-1)); 
					event.preventDefault();
				}
				//console.log(event.originalEvent);
			});
			
		}
		,
		_destroy: function(){
		}
	});
})(jQuery);