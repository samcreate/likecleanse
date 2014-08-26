	/*!*
	 * @author samuelme
	 * JQbook v1.0 - http://samcreate.com/
	 *
	 * JQbook is (c) 2007 Aaron McGuire and is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	 
	/*
	   Class: JQbook
	   Manages most basic retrieval of information from facebook.
	   
	   Requires:
	   
	   jquery: <http://docs.jquery.com/Downloading_jQuery>
	   
	   Facebook API: <http://connect.facebook.net/en_US/all.js>
	  
		<div id="fb-root"></div>
	  
	   
	   Quick Example:
	   
	   (start code)
			$(document).ready(function() {
									   
				$("#fb-root").bind(JQbook.events.CONNECTION_READY, _ready);	
				
				JQbook.init({appID:"APPLICATION_ID_NUMBER"});
				
				JQbook.login();
				
				
			});
			
			function _ready(p_evt,p_response){
				
				if (p_response.session){
					
					//logged in
					
				}else{
					
					//error
					
				}
			}
			
	   (end)
	   
	   
	   
	*/
	
	var JQbook = function(){
		
		var _user_name = "",_user_id = "",logged_in = false, _opts = ""; 
		
		
		return { 
		
			/*
			   Events: JQbook.events
			   
			   
				JQbook.events.USER_NOT_LOGGED_IN - User is not loggedin.
				JQbook.events.CONNECTION_READY    - Facebook is_connected and readys.
				JQbook.events.CONNECTION_READY_PERMISSIONS_NONE   - Causes the counter to only increment in even numbers.
				JQbook.events.CONNECTION_FAILED    - User authentication failed.
				JQbook.events.ON_USERINFO_FOUND    - User data recieved.
				JQbook.events.ON_USERINFO_NOTFOUND    - User data not found.
				JQbook.events.ON_WALLINFO_FOUND    - User_wall data found.
				JQbook.events.ON_WALLINFO_NOTFOUND    - User wall data not found.
				JQbook.events.ON_LIKESINFO_FOUND    - User likes data found.
				JQbook.events.ON_LIKESINFO_NOT_FOUND    - User likes data_not found.
				JQbook.events.ON_MOVIESINFO_FOUND    - User movies data found.
				JQbook.events.ON_MOVIESINFO_NOT_FOUND    - User movies data not found.
				JQbook.events.ON_NOTESINFO_FOUND    - User notes data found.
				JQbook.events.ON_NOTESINFO_NOT_FOUND    - User notes data not found.
				JQbook.events.ON_GROUPSINFO_FOUND    - User groups data found.
				JQbook.events.ON_GROUPSINFO_NOT_FOUND    - User groups data not found.
				JQbook.events.ON_IMAGESINFO_FOUND    - User images data found.
				JQbook.events.ON_STREAM_PUBLISH_SUCCESS    - STREAM PUBLISH SUCCEEDED.
				JQbook.events.ON_STREAM_PUBLISH_FAILED    - STREAM PUBLISH FAILED.
				
				Example:
				
				>		Listen to events on $("#fb-root")
				>
				>  
				>		$("#fb-root").bind(JQbook.events.CONNECTION_READY, _ready_handler);
				>  
				   
			  
			*/
			
			events : {
				
				USER_NOT_LOGGED_IN:"User_is_not_loggedin",
				CONNECTION_READY:"Facebook_is_connected_and_ready",
				CONNECTION_READY_PERMISSIONS_NONE:"User_connected_but_did_not_allow_the_extended_permissions_you_requested",
				CONNECTION_FAILED:"User_authentication_failed",
				ON_USERINFO_FOUND:"User_data_recieved",
				ON_USERINFO_NOTFOUND:"User_data_not_found",
				ON_WALLINFO_FOUND:"User_wall_data_found",
				ON_WALLINFO_NOTFOUND:"User_wall_data_not_found",
				ON_LIKESINFO_FOUND:"User_likes_data_found",
				ON_LIKESINFO_NOT_FOUND:"User_likes_data_not_found",
				ON_MOVIESINFO_FOUND:"User_movies_data_found",
				ON_MOVIESINFO_NOT_FOUND:"User_movies_data_not_found",
				ON_NOTESINFO_FOUND:"User_notes_data_found",
				ON_NOTESINFO_NOT_FOUND:"User_notes_data_not_found",
				ON_GROUPSINFO_FOUND:"User_groups_data_found",
				ON_GROUPSINFO_NOT_FOUND:"User_groups_data_not_found",
				ON_IMAGESINFO_FOUND:"User_images_data_found",
				ON_STREAM_PUBLISH_SUCCESS:"STREAM_PUBLISH_SUCCEEDED",
				ON_STREAM_PUBLISH_FAILED:"STREAM_PUBLISH_FAILED"
				
			},
			/*
			Object: JQbook.defaults
			
			appID, permissions
			
						*appID:* 'APPLICATION_ID_NUMBER'
						>
					   *permissions:* 'email,publish_stream,read_stream,user_groups,user_notes,user_birthday'
						
			Example:
				>JQbook.defaults = { appID: 'APPLICATION_ID_NUMBER', permissions: 'email,publish_stream,read_stream,user_groups,user_notes,user_birthday' }
						
			*/
			defaults : {
				
				appID: '',
				permissions: 'email,publish_stream,read_stream,user_groups,user_notes,user_birthday'
				
			},
			
			options : function(opts){
				
				if(opts == undefined || opts == "") opts = {};
						
				return $.extend({}, JQbook.defaults, opts);	
			},
			/*
			   Function: JQbook.init
			
				Initialize the facebook API library.
			
			   Parameters:
			
				  opts:object {appID: 'APPLICATION_ID_NUMBER', permissions: 'email,publish_stream,read_stream,user_groups,user_notes,user_birthday'}.
				  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.init({appID:"APPLICATION_ID_NUMBER"});
					   (end)
	
			
			  
			*/
	
			init : function(opts){
			
			    
			
			    try{
			    
			        JQbook.defaults.permissions = opts.permissions != null ? opts.permissions : JQbook.defaults.permissions;
				
				    JQbook.defaults.permissions =  JQbook.defaults.permissions == '' ? null : JQbook.defaults.permissions;
    		
				    FB.init({appId: JQbook.options(opts).appID, status: true, cookie: true, xfbml: true});
    				
				    JQbook.loginStatus();
			    
			    }catch(e){
			    
			        _opts = opts;
			       
		            var t = setTimeout(function(){JQbook.init(_opts);},1000);
		          
			    }	
			   
			},
			/*
			   Function: JQbook.loginStatus
			
			  Check if the user is logged in
			
			   Parameters:
			
				  p_callback:function - function called after facebook login status is true or false. If login status is true, the function will return an object with the user's id
				  if the status is false it returns false.
				  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.loginStatus();
					   (end)
	
			
			  
			*/
			loginStatus : function(p_callback){
				
				FB.getLoginStatus(function(response){
										   
						if (response.session){
														 
							logged_in = true;
							
							JQbook.uid(response.session.uid);
							
							$("#fb-root").trigger(JQbook.events.CONNECTION_READY, [ {uid:response.session.uid} ]);
							
							_callback(p_callback,response);	
						
						}
				});
				
			},
			/*
			   Function: JQbook.login
			
			   Logges the user into the facebook API. Login/Authorize/Permissions.
			
			   Parameters:
			
				  p_callback:function - function called after facebook login status is true or false. If login status is true, the function will return an object with the user's id
				  if the status is false it returns false.
				  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.login();
					   (end)
	
			
			  
			*/
			login : function (p_callback){
			
				FB.getLoginStatus(function(response){
										   
					if (response.session){
						
						logged_in = true;
						
						JQbook.uid(response.session.uid);
						
						$("#fb-root").trigger(JQbook.events.CONNECTION_READY, [ {uid:response.session.uid} ]);
						
						_callback(p_callback,response);
						
					}else{
						
						FB.login(function(response) {
										  
							if (response.session) {
								
								if (response.perms) {
									// Note: You can also check for specific extended permissions allowed if you need to here
									logged_in = true;
									JQbook.uid(response.session.uid);
									$("#fb-root").trigger(JQbook.events.CONNECTION_READY, [ {uid:response.session.uid} ]);
									_callback(p_callback,response);
									
								}else{
									logged_in = true;
									JQbook.uid(response.session.uid);
									$("#fb-root").trigger(JQbook.events.CONNECTION_READY_PERMISSIONS_NONE);
									_callback(p_callback,JQbook.events.CONNECTION_READY_PERMISSIONS_NONE);
								}	
								 
							} else {
								
									$("#fb-root").trigger(JQbook.events.CONNECTION_FAILED);
									_callback(p_callback,false);
									
							}},{perms:JQbook.options().permissions}
						);
					}
				});
				
			},
			/*
			   Function: JQbook.userInfo
				Returns users info 
			  
			  
			  
				-About.
				-birthday (check special permissions).
				-email (check special permissions).
				-first_name.
				-gender.
				-hometown.
				-id.
				-last_name.
				-link.
				-middle_name.
				-name.
				-timesone.
				-updataed_time.
				-verified.
			
			   Parameters:
			
				  p_callback:function - function called after facebook returns user info as an Object
				  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userInfo();
					   (end)
	
			
			  
			*/
			userInfo : function(p_callback){
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
			
				FB.api('/me', function(response){
					if(!response || response.error){
						// Facebook error getting the user's info
						$("#fb-root").trigger(JQbook.events.ON_USERINFO_NOTFOUND);
						_callback(p_callback,false);
						return(false);
					}
					
					$("#fb-root").trigger(JQbook.events.ON_USERINFO_FOUND, [ response ]);
					
					_callback(p_callback,response);
					
					JQbook.name(response.name);
					
					JQbook.uid(response.id);
					
				});
				
			},
			/*
			   Function: JQbook.userWall
			
			   Queries facebook for the users wallposts
			
			   Parameters:
					p_limit_amount:Number - limit the amount of posts we return.	
					p_callback:function - function called after facebook returns users wall posts as an Object
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userWall();
					   (end)
					   
				See Also:
					<JQbook.defaults>
	
			
			  
			*/
			userWall : function(p_limit_amount,p_callback){
				
			  if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
			  
			  if(p_limit_amount == null ||  p_limit_amount == ""){
				  
				  p_limit_amount = 50;
				  
			  }
			
			  FB.api(
				  {
					method: 'fql.query',
					query: 'SELECT actor_id, message FROM stream WHERE source_id = '+JQbook.uid()+' limit '+p_limit_amount
				  },
				  function(response) {
					  
					  $("#fb-root").trigger(JQbook.events.ON_WALLINFO_FOUND, [ response ]);
					  _callback(p_callback,response);
					 
				  }
				);
			},
			 /*
			   Function: JQbook.userLikes
			
			   Queries facebook for the users Likes
			
			   Parameters:	
					p_callback:function - function called after facebook returns users likes as an Object. If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userLikes();
					   (end)
	
				See Also:
					<JQbook.defaults>
			  
			*/
			userLikes : function(p_callback){
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
				
				FB.api('/'+JQbook.uid()+'/likes', function(response){
					if(!response || response.error){
						
						$("#fb-root").trigger(JQbook.events.ON_LIKESINFO_NOT_FOUND);
						_callback(p_callback, false);
						return(false);
					}
				
					
					$("#fb-root").trigger(JQbook.events.ON_LIKESINFO_FOUND, [ response.data ]);
					_callback(p_callback, response.data);
					
					
				});
			},
			 /*
			   Function: JQbook.userMovies
			
			   Queries facebook for the users movies
			
			   Parameters:	
					p_callback:function - function called after facebook returns users movies as an Object.  If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userMovies();
					   (end)
	
				See Also:
					<JQbook.defaults>
		  
			  
			*/
			userMovies : function(p_callback){
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
				
				FB.api('/'+JQbook.uid()+'/movies', function(response){
					if(!response || response.error){
						
						$("#fb-root").trigger(JQbook.events.ON_MOVIESINFO_NOT_FOUND);
						_callback(p_callback, false);
						return(false);
					}
			
					
					$("#fb-root").trigger(JQbook.events.ON_MOVIESINFO_FOUND, [ response.data ]);
					_callback(p_callback,  response.data);
					
				});
			},
			 /*
			   Function: JQbook.userNotes
			
			   Queries facebook for the users notes
			
			   Parameters:	
					p_callback:function - function called after facebook returns users notes as an Object.  If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userNotes();
					   (end)
	
				See Also:
					<JQbook.defaults>
		  
			  
			*/
			userNotes : function(p_callback){
				
				  if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
	
				  FB.api('/'+JQbook.uid()+'/notes', function(response){
					if(!response || response.error){
						
						$("#fb-root").trigger(JQbook.events.ON_NOTESINFO_NOT_FOUND);
						_callback(p_callback, false);
						return(false);
					}
			
					
					$("#fb-root").trigger(JQbook.events.ON_NOTESINFO_FOUND, [ response.data ]);
					_callback(p_callback,  response.data);
					
				});
			},
			/*
			   Function: JQbook.userGroups
			
			   Queries facebook for the users groups
			
			   Parameters:	
					p_callback:function - function called after facebook returns users groups as an Object.  If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userGroups();
					   (end)
	
				See Also:
					<JQbook.defaults>
		  
			  
			*/
			userGroups : function(p_callback){
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
				
				FB.api('/'+JQbook.uid()+'/groups', function(response){
					if(!response || response.error){
						
						$("#fb-root").trigger(JQbook.events.ON_GROUPSINFO_NOT_FOUND);
						_callback(p_callback, false);
						return(false);
					}
			
				
					$("#fb-root").trigger(JQbook.events.ON_GROUPSINFO_FOUND, [ response.data ]);
					_callback(p_callback,  response.data);
					
				});
			},
			/*
			   Function: JQbook.userProfileIMGS
			
			   Queries facebook for the users profile images(s). Recieves the user's profile image in 3 different sizes *(pic, pic_big, pic_square)*
			
			   Parameters:	
					p_callback:function - function called after facebook returns users images as an Object.  If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.userProfileIMGS();
					   (end)
	
				See Also:
					<JQbook.defaults>
		  
			  
			*/
			userProfileIMGS : function(p_callback){ 
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
				
				FB.api(
				  {
					method: 'fql.query',
					query: 'SELECT pic, pic_square,pic_big FROM profile WHERE id = '+JQbook.uid()
				  },
				  function(response) {
					  
					  $("#fb-root").trigger(JQbook.events.ON_IMAGESINFO_FOUND, [ response ]);
					  _callback(p_callback,response);
					 
				  }
				);	
			},
			/*
			   Function: JQbook.streamPublish
			
			   Publishes a post on the user's stream.
			
			   Parameters:
					p_name:String - name of post. 
					p_description:String - description on post.
					p_img:String - location of image.
					p_hrefTitle:String - link title.
					p_hrefLink:String - actual link.
					p_userPrompt:String - prompt, actually not sure what this does??
					p_display:String - put null to popup as modal, or put 'popup' to force a popup window. Defaults to iframe.
					p_callback:function - function called after facebook returns users images as an Object.  If nothing is recieved, it returns false.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.streamPublish("Samcreate", "Aaron McGuire's portfolio","http://samcreate.com/2010/portimages/5408matches.thumb2.jpg","www.samcreate.com","http://www.samcreate.com/",'user prompt!');
					   (end)
	
				See Also:
					<JQbook.defaults>
		  
			  
			*/
			streamPublish: function(p_name, p_description, p_img, p_hrefTitle, p_hrefLink, p_userPrompt,p_display,p_callback){
				
				if(logged_in ==false) { JQbook.debug(JQbook.events.USER_NOT_LOGGED_IN); return;}
				
				 FB.ui(
					{
						method: 'stream.publish',
						message: '',
						display: p_display,
						attachment: {
							name: p_name,
							caption: '',
							description: (p_description),
							href: p_hrefLink,
							media: [
								{
									'type': 'image',
									'src': p_img,
									'href': p_hrefLink
								}
							]
						},
						action_links: [
							{ text: p_hrefTitle, href: p_hrefLink }
						],
						user_prompt_message: p_userPrompt
					},
					function(response) {
						if (response && response.post_id) {
						   $("#fb-root").trigger(JQbook.events.ON_STREAM_PUBLISH_SUCCESS, [ response ]);
							_callback(p_callback,response);
						 } else {
							
							$("#fb-root").trigger(JQbook.events.ON_STREAM_PUBLISH_FAILED);
							_callback(p_callback,false);
						 }
					});
				 
				 
				 
			},
			/*
			   Function: JQbook.uid
			
			   A getter/stetter function for the user's ID. This is automatically set if the user has logged in successfully, or if <JQbook.userInfo> is called.
			
			   Parameters:	
					p_uid:String - The user's ID
								  
			
			   Returns:
			
				  The user's ID
				  
				Example:
				   
					  
							>//get id
							>var id = JQbook.uid();
							>
							>//set id
							>JQbook.uid(127634763);
				See Also:
					<JQbook.userInfo>	   
	
			  
			*/
			uid : function(p_uid){
				if(p_uid == null ||  p_uid == ""){
		
					return _user_id;
					
				}else{
		
					_user_id = p_uid;
				}
			},
			/*
			   Function: JQbook.name
			
			   A getter/stetter function for the user's Name. This is automatically set if <JQbook.userInfo> is called.
			
			   Parameters:	
					p_name:String - The user's Name
								  
			
			   Returns:
			
				  The user's Name
				  
				Example:
				   
					  
							>//get id
							>var id = JQbook.name();
							>
							>//set id
							>JQbook.name("Aaron McGuire");
				
				See Also:
					<JQbook.userInfo>
	
			  
			*/
			name : function(p_name) {
				if(p_name === null ||  p_name === ""){
					return _user_name;
				}else{
					_user_name = p_name;
				}
			},
			/*
			   Function: JQbook.debug
			
			   If console.log is available, it will out put. 
			
			   Parameters:	
					p_obj:* - Object to output.
								  
			
			   Returns:
			
				  Nothing.
				  
				Example:
				   
					   (start code)
							JQbook.login(function(response){
								JQbook.debug(response);				  
							});
					   (end)
	
				See Also:
					<http://getfirebug.com/>
			  
			*/
			debug : function($p_obj){
				if (window.console && window.console.log)
					window.console.log($p_obj);
			}
		}
		
		
		function _callback(p_func,response){
			
			if(typeof p_func == "function"){
				
				p_func(response);
				
			}
			
		}

		
	}()
