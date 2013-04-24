/*! privacy class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * @depends jquery/jquery-1.8.0.min.js
 */
var ubme = ubme || {};
ubme.privacy = function () {
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================
	
	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function () {

			debug.group("# [privacy.js]");

				debug.log('- initialized'); 

				//--> sof private functions

				//--> eof private functions

			debug.groupEnd();

		}
		
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private () {} ) =
	// ================================================
	
}();
//ubme.main.queue(ubme.privacy.init);


