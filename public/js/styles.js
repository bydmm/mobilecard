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
		//
		$('a.custombtn').click(function(){
			return preview;
		});
		
		$('a.custombtn').click(function(){
			var self = $(this);
			currentBlock = self.attr('id');
			
			reloadForm(self);
		});
		
		//form
		function reloadForm(self)
		{
			$('.editor-title').val(self.html());
		}
		//form handle
		$(".editor-title").keyup(function(){
		  $('#'+currentBlock).html($(this).val());
		});
		
		
		//editor
		$(".noUiSlider").slider({
			'min':"0",
			"max":"50"
		}).on('slide', function(ev){
			$('#'+currentBlock).css({'border-radius': ev.value+"%"});
		});
		//colorpicker
		$('.colorpicker').colorpicker().on('changeColor', function(ev){
		  $('#'+currentBlock).css({'background-color': ev.color.toHex()});
		});
  });
}(window.jQuery);