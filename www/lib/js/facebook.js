/*! facebook class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * @depends jquery/jquery-1.8.0.min.js
 */
var ubme = ubme || {};
ubme.facebook = function () {
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================
	var _likes = {};
	var _filtered_likes = [];
	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function () {

			debug.group("# [facebook.js]");

				debug.log('- initialized'); 

				//--> sof private functions
					_check_loginstatus();
				//--> eof private functions

			debug.groupEnd();

		}
		
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private () {} ) =
	// ================================================

	function _check_loginstatus () {
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// connected
				debug.log("connected");
				_getUsersLikes('/me/likes');
			} else if (response.status === 'not_authorized') {
				// not_authorized
				debug.log("not_authorized");
				_fb_login();
			} else {
				// not_logged_in
				debug.log("not_logged_in");
				_fb_login();
			}
		});
	}
	
	function _fb_login () {
		FB.login(function(response) {
	        if (response.authResponse) {
	           	debug.log("user logged-in");
	           	_getUsersLikes('/me/likes');
	        } else {
	            debug.log("user cancelled logged-in");
	        }
    	}, {scope: 'user_likes'});
	}

	function _getUsersLikes (p_call) {
		FB.api(p_call, function(response) {
			if(response.data) _proccess_likes(response);
		});
	}


	function _proccess_likes (response) {

		for(var index in response.data) {
			// debug.log( index + " : " + response.data[index]);
			_likes[index] = response.data[index];
		}
		if(response.paging.next){

			debug.log("get another page",response.paging.next);
			$.ajax({
			  dataType: "json",
			  url: response.paging.next,
			  success: function(res){
			  		debug.log("success: ", res);
			  		_proccess_likes(res);
			  }
			});
		}else{
			// "no more pages"
			debug.log(_likes);
			_filter_likes();
		}
	}

	function _filter_likes () {
		for(var index in _likes) {
			var _l = _likes[index];
			switch (_l.category) {
			   case "Local business":
			   case "Company":
			   case "Website":
			   case "App page":
			   case "Tv show":
			   case "Games/toys":
			   case "Internet/software":
			   case "Restaurant/cafe":
			   case "Organization":
			   case "Food/beverages":
			   case "Computers/internet website":
			   case "Record label":
			   case "Movie theater":
			   case "Retail and consumer merchandise":
			   case "Health/beauty":
			   case "Product/service":
			   case "Food":
			   case "Computers/technology":
			   case "News/media website":
			   case "Local/travel website":

			      _filtered_likes.push(_l);
			   break;
			}
			switch (_l.name) {
			   case "Local business":
			      _filtered_likes.push(_l);
			   break;
			}
		}


		
		$(document.body).trigger("finished", {likes:_filtered_likes});
	}


}();
//ubme.main.queue(ubme.facebook.init);


