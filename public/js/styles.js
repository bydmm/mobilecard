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
			$('a.custombtn').removeClass('gradient');
			self.addClass('gradient');
			reloadForm(self);
		});
		
		//form
		function reloadForm(self)
		{
			currentBlockIndex = self.attr('id');
			findBlock(currentBlockIndex);
			$('.editor-title').val(currentBlock.title);
			$('.editor-link').val(currentBlock.link);
			
			//form handle
			$(".editor-title").keyup(function(){
				var title = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.title = title;
				storeBlocks();
			});

			//editor
			$(".noUiSlider").slider({
				'min':"0",
				"max":"50"
			}).on('slide', function(ev){
				var border_radius = ev.value+"%";
				$('#'+currentBlockIndex).css({'border-radius': border_radius});
			});
			
			//colorpicker
			$('.editor-background-color #colorpicker').attr({'data-color': currentBlock.backgroundColor });
			$('.editor-background-color i').css({'background-color': currentBlock.backgroundColor });
			$('#colorpicker').colorpicker({
			}).on('changeColor', function(ev){
				var backgroundColor = ev.color.toHex();
			  $('#'+currentBlockIndex).css({'background-color': backgroundColor });
				currentBlock.backgroundColor = backgroundColor;
				storeBlocks();
			});
		}
		
		function findBlock(id)
		{
			$(blocks).each(function(){
				if(this.id == id){
					currentBlock = this;
					return this;
				}
			});
		}
		
		//可用么
		function storeBlocks()
		{
			for(var i=0; i<blocks.length; i++)
			{
				if(blocks[i].id == currentBlock.id){
					blocks[i] = currentBlock;
					return 1;
				}
			}
		}
		
		$('#'+currentBlockIndex).click();
		
  });
}(window.jQuery);