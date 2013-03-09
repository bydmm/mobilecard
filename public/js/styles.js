!function ($) {
  $(window).on('load', function () {
		//define var
		var preview = false;
		var editor;
		
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

		
		function RenderLink() //根据当前block的link类型，渲染表单
		{
			//editor-link
			var link = currentBlock.link;
			var linkType = 'hyperlink'; //link type select option val
			var inputType = 'text'; //
			
			if(link.match(/^tel:\/\//)){
				handleTel();
			}; 
			if(link.match(/^http:\/\//)){
				handlehyperlink();
			};
			if(link.match(/^https:\/\//)){
				handlehyperlink();
			};
			if(link.match(/^https:\/\/maps.google.com/)){
				handleMap();
			};
			if(link.match(/^mailto:/)){
				handleMail();
			};
			if(link.match(/#summery/)){
				handleSummery();
			};
			
			$('#link-type').val(linkType);
			$(".editor-link").prop('type',inputType);
			
			function handleTel()
			{
				linkType = 'tel';
				link = link.replace(/^tel:\/\//, '');
				showLinkAndHideEidtor();
				$('.editor-link').val(link);
			}
			
			function handlehyperlink()
			{
				linkType = 'hyperlink';
				inputType = 'url'
				showLinkAndHideEidtor();
				$('.editor-link').val(currentBlock.link);
			}
			
			function handleMail()
			{
				linkType = 'mail';
				inputType = 'email'
				link = link.replace(/^mailto:/, '');
				showLinkAndHideEidtor();
				$('.editor-link').val(link);
			}
			
			function handleMap()
			{
				linkType = 'map';
				inputType = 'url'
				showLinkAndHideEidtor();
				$('.editor-link').val(link);
			}
			
			function handleSummery()
			{
				linkType = 'summery';
				HideLinkAndShowEidtor();
				KindEditorHandle();
			}
			
		}
		
		function LinkChangeHandle() //当用户输入或者改变链接类型的时候重新渲染表单，以及保存到JSON中去
		{
			var prefix = '';
			$('#link-type').change(function(){
				var linkType = $(this).val();
				var inputType = 'text';
				switch(linkType){
					case 'tel':
						prefix = "tel://";
						showLinkAndHideEidtor();
						break;

					case 'hyperlink':
						inputType = 'url'
						showLinkAndHideEidtor();
						break;

					case 'mail':
						inputType = 'email'
						prefix = "mailto:";
						showLinkAndHideEidtor();
						break;

					case 'map':
						inputType = 'url'
						showLinkAndHideEidtor();
						break;

					case 'summery':
						HideLinkAndShowEidtor();
						KindEditorHandle();
						break;				
				}
				$(".editor-link").prop('type',inputType);
			});
			
			$(".editor-link").keyup(function(){
				var link = $(this).val();
			  $('#'+currentBlockIndex).attr('href', link);
				currentBlock.link = prefix + link;
				storeBlocks();
			});
		}
		
		function KindEditorHandle()
		{
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
		}
		
		function editorLinkHandle()
		{	
			RenderLink();
			LinkChangeHandle();
		}
		
		function showLinkAndHideEidtor()
		{
			$('.content-group').hide(300);
			$('.editor-link').show(300);
		}
		
		function HideLinkAndShowEidtor()
		{
			$('.content-group').show(300);
			$('.editor-link').hide(300);
		}
		
		function editorTitleHandle()
		{
			$('.editor-title').val(currentBlock.title);
			$(".editor-title").keyup(function(){
				var title = $(this).val();
			  $('#'+currentBlockIndex).html(title);
				currentBlock.title = title;
				storeBlocks();
			});
		}
		
		function editorBorderRadiuseHandle()
		{
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
		}
		
		function colorpickerHandle()
		{
			//colorpicker
			$('.editor-background-color #colorpicker').attr({'data-color': currentBlock.background_color });
			$('.editor-background-color i').css({'background-color': currentBlock.background_color });
			$('#colorpicker').colorpicker({
			}).on('changeColor', function(ev){
				var background_color = ev.color.toHex();
			  $('#'+currentBlockIndex).css({'background-color': background_color });
				currentBlock.background_color = background_color;
				storeBlocks();
			});			
		}
		
		function editorFontFamilyHandle()
		{
			//editor-font-family
			$('#editor-font-family').val(currentBlock.font_family);
			$('#editor-font-family').change(function(){
				var font_family = $(this).val();
				currentBlock.font_family  = font_family;
				$('#'+currentBlockIndex).css({'font-family': font_family });
				storeBlocks();
			});
		}
		
		//form
		function reloadForm(self)
		{	
				
			currentBlockIndex = self.attr('id');
			findBlock(currentBlockIndex);
			
			//reload form handle
			editorTitleHandle();
			editorLinkHandle();
			editorBorderRadiuseHandle();
			colorpickerHandle();
			editorFontFamilyHandle();
			
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
		
		$('#saveSite').click(function(){
			$.ajax({ 
				url : "index.php?a=saveSite",
				data : {
					"blocks" : blocks
				},
				dataType : "json",
				type : "POST",
				success: function(){
			  	$(this).addClass("done");
				},
				error: function(){
			        
				}
			});
		});
		
  });
}(window.jQuery);