/*! homePage class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * 
 */
var ubme = ubme || {};
ubme.homePage = function () {
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================
	var likes_source = $('#likes-template').html(),
		likes_template = Handlebars.compile(likes_source);
	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function () {

			debug.group("# [homePage.js]");

				debug.log('- initialized'); 

				//--> sof private functions

					_setupBinds();

				//--> eof private functions

			debug.groupEnd();

		},
		showLikes : function(p_likes){
			var data = {like: p_likes};
			var likes = likes_template(data);
			$("#MainContent").append(likes);
			FB.XFBML.parse();
		}
		
	};
	
	return self;

	
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	function _setupBinds () {

		$(document.body).bind('fbinit', ubme.facebook.init);

		$(document.body).on('click', '.show-modal', function (e) {
			e.preventDefault();
			ubme.modal.show('hi! this is a modal!', 'hello-modal');
		});

	}
	
}();
//ubme.main.queue(ubme.homePage.init);


