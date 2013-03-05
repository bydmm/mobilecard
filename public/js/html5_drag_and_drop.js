(function($){
	$(document).ready(function(){
		var dragSrcEl = null;

		function handleDragStart(e) {
		  dragSrcEl = $(this);

		  e.dataTransfer.effectAllowed = 'move';
		  e.dataTransfer.setData('text/html', this.innerHTML);
		}

		function handleDragEnter(e) {}

		function handleDragOver(e) {
		  if (e.preventDefault) {
		    e.preventDefault(); // Necessary. Allows us to drop.
		  }

		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		  return false;
		}

		function handleDragLeave(e) {}

		function handleDrop(e) {
		  // this/e.target is current target element.
		  if (e.stopPropagation) {
		    e.stopPropagation(); // Stops some browsers from redirecting.
		  }

		  // Don't do anything if dropping the same column we're dragging.
		  if (dragSrcEl != this) {
		    // Set the source column's HTML to the HTML of the column we dropped on.
		    var tmp = dragSrcEl.html();
		    dragSrcEl.html($(this).html());
		    $(this).html(tmp);
		  }

		  return false;
		}

		function handleDragEnd(e) {}

		function addDragAndDrop(selectors) { // 添加拖拽事件
			var cols = document.querySelectorAll(selectors);
			[].forEach.call(cols, function(col) {
				col.addEventListener('dragstart', handleDragStart, false);
				col.addEventListener('dragenter', handleDragEnter, false)
				col.addEventListener('dragover', handleDragOver, false);
				col.addEventListener('dragleave', handleDragLeave, false);
				col.addEventListener('drop', handleDrop, false);
				col.addEventListener('dragend', handleDragEnd, false);
			});
		}

		addDragAndDrop('.block');
		
		var newid = 0;
		$('#add').click(
		  function(){
		  	var add_html = $('.basic .row-fluid:last .block:last').html();	 
		  	switch ($('.basic .row-fluid:last .block').length){
		  		case 1:
		  			$('.basic .row-fluid:last .block:last')
		  				.after('<div draggable="true" class="block span6">'+add_html+'</div>');
		  			break;
		  		case 2:
		  			$('.basic .row-fluid:last')
		  				.after('<div class="row-fluid"><div draggable="true" class="block span6">'+add_html+'</div></div>');
		  			break;
		  	}
		  	$('.basic .row-fluid:last .block:last a').attr('id',"new"+newid);
				newid++;
		  	addDragAndDrop('.block');

		  }
		);

	});
})(jQuery);  