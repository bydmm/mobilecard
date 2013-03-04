(function($){
	$(document).ready(function(){
		var dragSrcEl = null;

		function handleDragStart(e) {
			if ($(this).hasClass('custombtn')) return false;

			// Target (this) element is the source node.
			this.classList.add('drag');

			dragSrcEl = this;
		}

		function handleDragEnter(e) {
			if ($(this).hasClass('custombtn')) return false;
			if (!dragSrcEl) return false;

			// this / e.target is the current hover target.
			this.classList.add('over');
		}

		function handleDragOver(e) {
			if ($(this).hasClass('custombtn')) return false;
			if (!dragSrcEl) return false;

			if (e.preventDefault) {
				e.preventDefault(); // Necessary. Allows us to drop.
			}

			return false;
		}

		function handleDragLeave(e) {
			if ($(this).hasClass('custombtn')) return false;
			if (!dragSrcEl) return false;

			this.classList.remove('drag');
			this.classList.remove('over');  // this / e.target is previous target element.
		}

		function handleDrop(e) {
			if ($(this).hasClass('custombtn')) return false;
			if (!dragSrcEl) return false;

			// this/e.target is current target element.

			// Don't do anything if dropping the same column we're dragging.
			if (dragSrcEl != this) {

				// Set the source column's HTML to the HTML of the column we dropped on.
				dragSrcEl.innerHTML = this.innerHTML;
				this.innerHTML = e.dataTransfer.getData('text/html');
			}

			return false;
		}

		function handleDragEnd(e) {
			if ($(this).hasClass('custombtn')) return false;
			if (!dragSrcEl) return false;
			
			// this/e.target is the source node.

			[].forEach.call(cols, function (col) {
				col.classList.remove('drag');
				col.classList.remove('over');
			});
		}

		var cols = document.querySelectorAll('.basic .custombtn');
		[].forEach.call(cols, function(col) {
			col.addEventListener('dragstart', handleDragStart, false);
			col.addEventListener('dragenter', handleDragEnter, false)
			col.addEventListener('dragover', handleDragOver, false);
			col.addEventListener('dragleave', handleDragLeave, false);
			col.addEventListener('drop', handleDrop, false);
			col.addEventListener('dragend', handleDragEnd, false);
		});

	});
})(jQuery);  