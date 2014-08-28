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
	var _count = 0;
	var _init = false;
	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function () {

			debug.group("# [facebook.js]");

				debug.log('- initialized'); 

				//--> sof private functions
					_init = true;
					_check_loginstatus();
					_setup_binds();

				//--> eof private functions

			debug.groupEnd();

		},
		share : function(){
		
				 var obj = {
		          method: 'feed',
		          redirect_uri: window.location.href,
		          link: window.location.href,
		          picture: "http://www.likecleanse.com/media/images/facebook_share.jpg?version=22",
		          name: 'I just removed '+_count+' likes I didn\'t know I had',
		          caption: 'Cleaning likes you didn\'t know you had',
		          description: 'We have all liked things in the past... too many things to remember. Now Facebook is using those \'likes\' to target our friends. STOP THE INSANITY! Reduce the clutter you didn\'t know you had.  Login below to see the brands targeting you and \'un-like\' the unworthy ones.'
		        };
				 FB.ui(obj, function(){
				 	debug.log("share success");
				 });
			
		},
		count : function(p_val){
			if(p_val != null){
				_count = p_val;
			}else{
				return p_val;
			}
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
	           	 $('.alert').hide();
	           	_getUsersLikes('/me/likes');
	        } else {
	            debug.log("user cancelled logged-in");
	            $('.alert').show();
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
			_filtered_likes.push(_l);
			
		}


		
		$(document.body).trigger("finished", {likes:_filtered_likes});
	}


	function _setup_binds () {
		FB.Event.subscribe('edge.remove',
		    function(response) {
		        debug.log('You unliked the URL: ' + response);
		        _count++;
		        $.cookie('the_count', _count);
		        $('#count').text(_count);
		    }
		);
	}


}();
//ubme.main.queue(ubme.facebook.init);


