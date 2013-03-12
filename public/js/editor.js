KindEditor.ready(function(K) {
	var upload = K.editor({
		allowFileManager : true,
		langType : 'en'
	});
	K('#drag-images').click(function() {
		upload.loadPlugin('image', function() {
			upload.plugin.imageDialog({
				showRemote : false,
				imageUrl : K('#url3').val(),
				clickFn : function(url, title, width, height, border, align) {
					K('#url3').val(url);
					K('img.logo').attr('src',url);
					site['logo'] = url;
					upload.hideDialog();
				}
			});
		});
		return false;
	});
	
	//pagetitle
	$("#pagetitle").val(site['title']);
	$("#pagetitle").keyup(function(){
		var title = $(this).val();
		$('.preview .pagetitle').html(title);
		site['title'] = title;
	});
	
});