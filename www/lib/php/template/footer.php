		</div>
		</div><!-- eof #MainContent -->

		<footer id="global-footer">
			<p>Created by: <a href="http://samcreate.com">samcreate</a></p> 
		</footer>
	</div>
	<!--[if lt IE 7 ]>
	<script src="lib/js/plugins/dd_belatedpng.js"></script>
	<script> DD_belatedPNG.fix('img, .png_bg');</script>
	<![endif]-->

	<!-- BEGIN handlebars templates -->

		<?php 
		foreach (glob("lib/js/template/*.tpl") as $filename){
		    include $filename;
		}
		?>
	<!-- END handlebars templates -->

	<script type="text/javascript"> window._app_vars = <?= $settings->app_vars_JSON() ?>; </script>
	
	<?php if ($settings->environment == PROD) { ?>
		<!-- BEGIN: PROD javascript -->
		<script src="/lib/js/evbmaster-min.js" type="text/javascript" charset="utf-8"></script>
		<!-- END: PROD javascript -->
	<?php } else { ?>
		<!-- BEGIN: DEV javacript -->
		<script src="/lib/js/jquery/jquery-1.8.0.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="/lib/js/jquery/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
		<script src="/lib/js/plugins/handlebars-1.0.rc.1.js" type="text/javascript"></script>
		<script src="/lib/js/plugins/bootstrap.min.js" type="text/javascript"></script>
		<script src="/lib/js/main.js" type="text/javascript" charset="utf-8"></script>
		<script src="/lib/js/modal.js" type="text/javascript" charset="utf-8"></script>
		<script src="/lib/js/facebook.js" type="text/javascript" charset="utf-8"></script>
		<script src="/lib/js/homePage.js" type="text/javascript" charset="utf-8"></script>
		<!-- END: DEV javascript -->
	<?php } ?>

	<script type="text/javascript">	
		<?php 
			if (defined('URI_PART_0')) {
				$nm_space = str_replace("-", "", URI_PART_0);
				echo "ubme.main.queue(ubme.".$nm_space.".init);";
			} else {
				echo "ubme.main.queue(ubme.homePage.init);";
			}
		?>
	</script>


	<script type="text/javascript">
  		var _gaq = _gaq || [];
  		_gaq.push(['_setAccount', '<?= $settings->analytics_id ?>']);
  		_gaq.push(['_trackPageview']);
		
  		(function() {
  		  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  		  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  		  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  		})();
	</script>

	<div id="fb-root"></div>
	<script>
	  window.fbAsyncInit = function() {
	    // init the FB JS SDK
	    FB.init({
	      appId      : '<?= $settings->facebook_app_id; ?>', // App ID from the App Dashboard
	      channelUrl : '//<?= $settings->server_name; ?>/channel.html', // Channel File for x-domain communication
	      status     : true, // check the login status upon init?
	      cookie     : true, // set sessions cookies to allow your server to access the session?
	      xfbml      : true  // parse XFBML tags on this page?
	    });
	    $('body').trigger('fbinit');
	    // Additional initialization code such as adding Event Listeners goes here

	  };

	  // Load the SDK's source Asynchronously
	  // Note that the debug version is being actively developed and might 
	  // contain some type checks that are overly strict. 
	  // Please report such bugs using the bugs tool.
	  (function(d, debug){
	     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement('script'); js.id = id; js.async = true;
	     js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
	     ref.parentNode.insertBefore(js, ref);
	   }(document, /*debug*/ false));
	</script>
</body>
</html>
