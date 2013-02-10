<?php 

/**
* Initalize the application
*/
class App{
	
	function __construct(){
		
		$this->_setup_uri();

		$this->_find_controller();
		
	}

	private function _setup_uri(){

		$ru = &$_SERVER['REQUEST_URI'];
		$qmp = strpos($ru, '?');
		list($path, $params) = $qmp === FALSE
		    ? array($ru, NULL)
		    : array(substr($ru, 0, $qmp), substr($ru, $qmp + 1));
		$parts = explode('/', $path);
		$i = 0;
		foreach ($parts as $part)
		{
		    if (strlen($part) && $part !== '..' && $part !== '.')
		    {
		        define('URI_PART_'.$i++, $part);
		    }
		}
		define('URI_PARAM', isset($params) ? '' : $params);
		define('URI_PARTS', $i);
		define('URI_PATH', $path);
		define('URI_REQUEST', $_SERVER['REQUEST_URI']);
		
	}

	private function _find_controller(){
		session_start();
		require_once DIR_SYS.'/Config.php';
		include DIR_SYS.'/router.php';
		include DIR_SYS.'/config.routes.php';
		if ($ctrl = Router::controller()) {
			$settings = Config::getInstance();
		    include $ctrl;
		}else{
		    include DIR_WEB."/404.html";
		}
	}
}

 ?>
