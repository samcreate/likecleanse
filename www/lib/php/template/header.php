<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js" xmlns:fb="http://ogp.me/ns/fb#"> <!--<![endif]-->
<head>
	<title><?= $settings->getPageTitle() ?></title>

	<!-- BEGIN: meta tags -->
		<meta charset="UTF-8">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="favicon.ico"/> 

		<meta name="description" content=""/> 
		<meta name="keywords" content=""/>
		<meta name="description" content="">
		<meta name="author" content="">
	<!-- END: meta tags -->

	<!-- BEGIN: OG FBook meta tags -->
		<meta property="og:type" content="website"/> 
		<meta property="og:image" content="<?= $settings->protocol ?>://<?= $settings->server_name ?>/media/images/facebook_share.jpg" />

		<meta property="fb:admins" content=""/> 
		<meta property="og:url" content=""/> 
		<meta property="og:title" content="" /> 
		<meta property="og:site_name" content=""/> 
		<meta property="og:description" content=""/> 
	<!-- END: OG FBook meta tags -->

	<!-- BEGIN: <?= $settings->environment ?> styles -->
		<link rel="stylesheet" type="text/css" href="<?= $settings->css_path ?>"/>
		<script type="text/javascript">
			document.write('<link rel="stylesheet" href="styles/javascript.css" />'); 
		</script>
	<!-- END: <?= $settings->environment ?> styles -->

	<script>
		/*<![CDATA[*/
			document.createElement('header');
			document.createElement('hgroup');
			document.createElement('nav');
			document.createElement('footer');
			document.createElement('article');
			document.createElement('section');
		/*]]>*/
	</script>
</head>
<body class="<?php if (isset($class)) echo $class; ?>">
	<div id="PageWrapper">
		<div id="MainContent" role="main">
		<div class="jumbotron">
			<h1>Facebook Cleanser</h1>
