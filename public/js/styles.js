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
		
		
		
		$('.preview .header').click(function(){
			$('#headfrom').show(300);
			$('#blockfrom').hide(300);
			
			$('.gradient').removeClass('gradient');
			$(this).addClass('gradient');
			
		});
		
		$('.preview .header').click();
		
		$('a.custombtn').live('click', function(){
			return preview;
		});
		
		$('a.custombtn').live('click', function(){
			
			$('#blockfrom').show(300);
			$('#headfrom').hide(300);
			
			var self = $(this);	
			$('.gradient').removeClass('gradient');
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
			
			//editor-title
			$('.editor-title').val(currentBlock.title);
			$(".editor-title").keyup(function(){
				var title = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.title = title;
				storeBlocks();
			});
			
			//editor-link
			var link = currentBlock.link;
			var type = '';
			if(link.match(/^tel:\/\//)){
				type = 'tel';
			}; 
			if(link.match(/^http:\/\//)){
				type = 'hyperlink';
			};
			if(link.match(/^https:\/\//)){
				type = 'hyperlink';
			};
			if(link.match(/^https:\/\/maps.google.com/)){
				type = 'map';
			};
			if(link.match(/^mailto:/)){
				type = 'mail';
			};
			if(link.match(/#summery/)){
				type = 'summery';
			};
			
			var linkType = 'hyperlink';
			var editor;
			var inputType = 'text';
			switch(type){
				case 'tel':
					linkType = 'tel';
					link = link.replace(/^tel:\/\//, '');
					$('.content-group').hide(300);
					$('.editor-link').show(300).val(link);
					break;
				
				case 'hyperlink':
					linkType = 'hyperlink';
					inputType = 'url'
					$('.content-group').hide(300);
					$('.editor-link').show(300).val(currentBlock.link);
					break;
					
				case 'mail':
					linkType = 'mail';
					inputType = 'email'
					link = link.replace(/^mailto:/, '');
					$('.content-group').hide(300);
					$('.editor-link').show(300).val(link);
					break;
				
				case 'map':
					linkType = 'map';
					inputType = 'url'
					$('.content-group').hide(300);
					$('.editor-link').show(300).val(link);
					break;
				
				case 'summery':
					linkType = 'summery';
					link = link.replace(/^#summery/, '');
					$('.editor-link').hide(300);
					$('.content-group').show(300);
					editor = KindEditor.create('#content', {
						width : '100%',
						minHeight : '200px',
						resizeType : 0,
						allowPreviewEmoticons : false,
						allowImageUpload : false,
						items : [
							'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
							'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
							'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
						afterChange : function() {
							var content = editor.html();
							currentBlock.summery = content;
							currentBlock.link = "#summery-" + currentBlock.id;
							storeBlocks();
						}
					});
					break;				
			}
			$('#link-type').val(linkType);
			$(".editor-link").prop('type',inputType);
			
			var prefix = '';
			$('#link-type').change(function(){
				var linkType = $(this).val();
				var inputType = 'text';
				switch(linkType){
					case 'tel':
						prefix = "tel://";
						$('.content-group').hide(300);
						$('.editor-link').show(300);
						break;

					case 'hyperlink':
						inputType = 'url'
						$('.content-group').hide(300);
						$('.editor-link').show(300);
						break;

					case 'mail':
						inputType = 'email'
						prefix = "mailto:";
						$('.content-group').hide(300);
						$('.editor-link').show(300);
						break;

					case 'map':
						inputType = 'url'
						$('.content-group').hide(300);
						$('.editor-link').show(300);
						break;

					case 'summery':
						$('.editor-link').hide(300);
						$('.content-group').show(300);
						editor = KindEditor.create('#content', {
							width : '100%',
							minHeight : '200px',
							resizeType : 0,
							allowPreviewEmoticons : false,
							allowImageUpload : false,
							items : [
								'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
								'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
								'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
							afterChange : function() {
								var content = editor.html();
								currentBlock.summery = content;
								currentBlock.link = "#summery-" + currentBlock.id;
								storeBlocks();
							}
						});
						break;				
				}
				$(".editor-link").prop('type',inputType);
			});
			
			$(".editor-link").keyup(function(){
				var link = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.link = prefix+link;
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
		
		
		
		
		
  });
}(window.jQuery);