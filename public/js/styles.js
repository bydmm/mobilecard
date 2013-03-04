!function ($) {
  $(window).on('load', function () {
		Intialize();
		//旋转重构	
		var supportsOrientationChange = "onorientationchange" in window,  
	    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";	
		if(window.addEventListener){
			window.addEventListener(orientationEvent, function(){
				setTimeout(Intialize,100);
			}, false);
		 }else{
			 window.attachEvent(orientationEvent,function(){
				 setTimeout(Intialize,100);
			 });
		 }
		
		function Intialize(){
			var width = $('a.custombtn').width();
			$('a.custombtn').css({
				'height': width + 'px',
				'line-height': width + 'px',
				'font-size': width/4 + 'px'
			});
			// $('a.custombtn').animate(
			// 	{
			// 		'height': width + 'px',
			// 		'line-height': width + 'px',
			// 		'font-size': width/4 + 'px'
			// 	},
			// 	'1',
			// 	'swing'
			// );
		}
		
		//editor
		$(".noUiSlider").slider({
			'min':"0",
			"max":"100"
		}).on('slide', function(ev){
			$('.custombtn').css({'border-radius': ev.value+"px"});
		});
		//colorpicker
		$('.colorpicker').colorpicker().on('changeColor', function(ev){
		  $('.custombtn').css({'background-color': ev.color.toHex()});
		});
  });
}(window.jQuery);