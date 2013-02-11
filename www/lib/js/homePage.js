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
		showLikes : function(p_obj){
			var data = {like: p_obj.likes};
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

		$(document.body).bind('fbinit',function(){
			$("#PageWrapper .jumbotron .btn").fadeIn("slow");
		});

		$(document.body).on('click', '#PageWrapper .jumbotron .btn', function (e) {
			e.preventDefault();
			$(this).button('loading');
			ubme.facebook.init();
			debug.log("called");
		});


		$(document.body).bind('finished',function(e, p_filteredlikes){

			$('#PageWrapper .jumbotron .btn').button('complete').fadeTo('slow', 0.5);

			$(document.body).off('click', '#PageWrapper .jumbotron .btn')
			self.showLikes(p_filteredlikes);



		});


		 

		$(document.body).on('click', '.show-modal', function (e) {
			e.preventDefault();
			ubme.modal.show('hi! this is a modal!', 'hello-modal');
		});

	}
	
}();
//ubme.main.queue(ubme.homePage.init);


