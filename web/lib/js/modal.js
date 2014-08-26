/*! modal class
 * @depends plugins/handlebars-1.0.rc.1.js
 */

var ubme = ubme || {};
ubme.modal = function () {

	var modal_source = $('#modal-template').html(),
		modal_template = Handlebars.compile(modal_source);
		
	var self = {
			init: function () {
				setupBinds();
			},
			show: function (content, classes) {
				var data = { 
						'content': content,
						'classes': classes
					},
					modal = modal_template(data);
				$(document.body).append(modal);
			},
			close: function () {
				$('.overlay').remove();
				$('.modal').remove();
			}
		};

	return self;

	function setupBinds () {

		$(document.body).on('click', '.overlay, .close', function (e) {
			e.preventDefault;
			ubme.modal.close();
		});

		$(document).keyup(function (e) {
			if (e.keyCode == 27) ubme.modal.close();
		});
	}
	
}();
ubme.main.queue(ubme.modal.init);


