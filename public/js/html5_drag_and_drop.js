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

		function Block(id, order) {
			return eval({"title":"NEW","link":"http://","id":id,"order":order,"border_radius":"15%","backgroundColor":"rgb(255, 122, 0)"," ":""});
		}
		
		var newid = 0;
		$('#add').click(
			function(){
				var width = $('.basic').width() * (1 - 0.02127659574468085) / 2;
				var height = width + 'px';
				var line_height = width + 'px';
				var font_size = width/4 + 'px';

				var lastBlock = $('.basic .row-fluid .block a.custombtn:last');
				// 如果页面被清空 
				if (0 == lastBlock.length) {
					var order = 0;
				} else {
					var order = parseInt(lastBlock.attr('order'));
				}

				var index = blocks.push(new Block("new" + newid, order+1));

				var style = 'height:' + height 
					+ '; line-height:' + line_height
					+ '; font-size:' + font_size
					+ '; border_radius:' + blocks[index-1].border_radius
					+ '; backgroundColor:' + blocks[index-1].backgroundColor;
					
					
				var add_html = '<a id="'+ blocks[index-1].id
					+ '" order="'+ blocks[index-1].order
					+ '" href="'+ blocks[index-1].link 
					+ '"" style="'+ style 
					+'" class="custombtn">'
					+ blocks[index-1].title +'</a>';
					
				switch ($('.basic .row-fluid:last .block').length){
					case 1: // 在行中新增
						$('.basic .row-fluid:last .block:last')
							.after('<div draggable="true" class="block span6">'+add_html+'</div>');
						break;
					case 2: // 新增一行
					default:
						$('.basic .row-fluid:last')
							.after('<div class="row-fluid"><div draggable="true" class="block span6">'+add_html+'</div></div>');
				}
				// 模拟点击
				$('.basic .row-fluid .block a.custombtn:last').attr('id', "new"+newid).trigger('click');
				newid++;
				addDragAndDrop('.block');
			}
		);

		$('#block-remove').click(function(){
			var gradient = $('a.gradient');
			// 禁止没有选中时删除
			if (0 == gradient.length) {
				return false;
			}

			var id = gradient.attr('id');
			// 从数组中删除
			for (var i = blocks.length - 1; i >= 0; i--) {
				if (blocks[i].id == id) {
					blocks.splice(i , 1);
					break;
				}
			}		
			
			var row = gradient.parent('.block').parent('.row-fluid');
			// 如果该行只剩一个 则将该行删除
			if (1 == row.find('a.custombtn').length) {
				row.remove();
			} else { // 否则只将选中的删除
				gradient.remove();
			}

			// 模拟点击
			$('.basic .row-fluid:first').trigger('click');
		});

	});
})(jQuery);  