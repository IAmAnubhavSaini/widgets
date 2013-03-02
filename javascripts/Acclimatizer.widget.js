/* AFL. read readme file at https://github.com/IAmAnubhavSaini/widgets/blob/master/README.md */
(function($, undefined){//acclimatizer
	$.widget("anubhav.Acclimatize", {
		options: {
		//inactive state class is where things start from. It's a must.
			inactiveStateClass: 'dormant-items'
			, activeStateClass:	'active-item'
			, parentClass: 'acclimate-item'
		}
		,	_create: function(){
				var _ref = this;
				var _opt = _ref.options;
				var _iSC = _opt.inactiveStateClass;
				var _aSC = _opt.activeStateClass;
				var _pC = _opt.parentClass;
//how to pass an object to widget
//trick question: you don't pass objects to widgets. You manage their states only.
				$.each($('.'+_pC+' .'+_iSC), 
					function(key,val){
						//console.log($(val))//p.fn.p.init[1]
						//console.log(val);//<div class="inactive">element</div>
						$(val).on('click',function(){
							$(val).toggleClass(_iSC)
								.toggleClass(_aSC);
						}
						);
					}
				);
			}
		,	_destroy : function(){
				// $.each($('.'+_pC+' .'+_iSC), 
					// function(key,val){
						// $(val).('click');
					// }
				// );
			}
	});
})(jQuery);