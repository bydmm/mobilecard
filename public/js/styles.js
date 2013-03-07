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
			
			$('.preview a.custombtn').css({
				'height': width + 'px',
				'line-height': width + 'px',
				'font-size': width/4 + 'px'
			});
			
			$('.preview .block').css({
				'height': width + 'px'
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
		$('a.custombtn').live('click', function(){
			return preview;
		});
		
		$('a.custombtn').live('click', function(){
			var self = $(this);	
			$('a.custombtn').removeClass('gradient');
			self.addClass('gradient');
			reloadForm(self);
		});
		
		$('.preview .header').live('click', function(){
			
		});
		
		//form
		function reloadForm(self)
		{
			currentBlockIndex = self.attr('id');
			findBlock(currentBlockIndex);
			
			$('.editor-link').val(currentBlock.link);
			
			//editor-title
			$('.editor-title').val(currentBlock.title);
			$(".editor-title").keyup(function(){
				var title = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.title = title;
				storeBlocks();
			});
			
			//editor-link
			$('.editor-link').val(currentBlock.link);
			$(".editor-link").keyup(function(){
				var link = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.link = link;
				storeBlocks();
			});

			//editor
			//alert(currentBlock.border_radius);
			var radius = parseInt(currentBlock.border_radius);
			
			$("#editor-border-radius").slider({
				'min': "0",
				"max": "50",
				'value': radius
			}).on('slide', function(ev){
				var border_radius = ev.value;
				$('#'+currentBlockIndex).css({'border-radius': border_radius+"%"});
				currentBlock.border_radius = border_radius;
				storeBlocks();
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
			
			//editor-font-family
			$('#editor-font-family').val(currentBlock.fontfamily);
			$('#editor-font-family').change(function(){
				var font = $(this).val();
				currentBlock.fontfamily  = font;
				$('#'+currentBlockIndex).css({'font-family': font });
				storeBlocks();
			});
			
			//remove
			
			
		}
			
		$('#block-remove').popover({
			'title': 'Caution',
			'trigger': 'hover',
			'html': true,
			'placement': 'top',
			'content': '<div>It will remove this block!</div>'
		});
		$('#block-remove').modal({
		    backdrop: true,
		    keyboard: true,
		    show: false
		});
			
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