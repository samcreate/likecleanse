<?php

ob_start('ob_gzhandler');
define('DIR_WEB', dirname(__FILE__));
define('DIR_PHPLIB', dirname(__FILE__).'/lib/php');
define('DIR_SYS', DIR_PHPLIB.'/system');
define('DIR_CTRL', DIR_PHPLIB.'/controller');
define('DIR_MDL', DIR_PHPLIB.'/model');
define('DIR_TMPL', DIR_PHPLIB.'/template');
define('DIR_VIEW', DIR_PHPLIB.'/view');
define('DIR_PLUGINS', DIR_PHPLIB.'/plugins');

require_once DIR_PHPLIB.'/app.php';

$app = new App();

?>
