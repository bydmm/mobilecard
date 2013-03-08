KindEditor.ready(function(K) {
	var editor = K.editor({
		allowFileManager : true,
		langType : 'en'
	});
	K('#drag-images').click(function() {
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				imageUrl : K('#url3').val(),
				clickFn : function(url, title, width, height, border, align) {
					K('#url3').val(url);
					K('img.logo').attr('src',url);
					editor.hideDialog();
				}
			});
		});
		return false;
	});
	
	//pagetitle
	$("#pagetitle").val($('.preview .pagetitle').html());
	$("#pagetitle").keyup(function(){
		var title = $(this).val();
		$('.preview .pagetitle').html(title);
	});
	
});