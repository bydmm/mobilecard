!function ($) {
  $(window).on('load', function () {
		//define var
		var preview = false;
		
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
			
			$('a.custombtn').animate(
				{
					'height': width + 'px',
					'line-height': width + 'px',
					'font-size': width/4 + 'px'
				},
				'1',
				'swing'
			);
		}

		$('#close').click(function(){
			$('.mark').hide();
		});
  });
}(window.jQuery);