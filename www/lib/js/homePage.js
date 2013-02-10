/*! homePage class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * 
 */
var ubme = ubme || {};
ubme.homePage = function () {
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================

	
	
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

		}
		
	};
	
	return self;

	
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	function _setupBinds () {

		$(document.body).on('click', '.show-modal', function (e) {
			e.preventDefault();
			ubme.modal.show('hi! this is a modal!', 'hello-modal');
		});

	}
	
}();
//ubme.main.queue(ubme.homePage.init);


