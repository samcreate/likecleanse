<?php
/**
 * Router manager class
 * Statically stores all routes. The router manager is responsible for applying
 * consistent URI patterns such as having a slash at the end as well as
 * redirecting the client. If the routes don't match or it does but the
 * controller doesn't exist, it looks for the slash at the end of the path. If
 * it does not exist, it redirects with the slash appended and tries one more
 * time. The reason why the non-slash is tried is some scripts and files behave
 * differently to certain URIs (ex. javascript files which include others).
 *
 * @package router
 */
class Router
{
    //{{{ properties
    /**
     * Array of routes
     */
    private static $routes = array(self::PRIORITY_HIGH => array(), 
                                   self::PRIORITY_NORMAL => array(), 
                                   self::PRIORITY_LOW => array());
    /**
     * Matching pattern method (ROUTE/REDIRECT constant)
     */
    private static $method;
    /**
     * Source that provided the route scanned. This is recorded along with
     * router::add() when the route is passed in hook_routes().
     */
    private static $source;
    /**
     * Matching pattern
     */
    private static $pattern;
    /**
     * Matching controller after preg_replace()
     */
    private static $ctrl;
    /**
     * Flag for scanning routes
     */
    private static $scanned = FALSE;

    //}}}
    //{{{ constants
    /**
     * Route uses PCRE
     */
    const ROUTE_PCRE = 0;
    /**
     * Route is static
     */
    const ROUTE_STATIC = 1;
    /**
     * Redirect using PCRE
     */
    const REDIRECT_PCRE = 2;
    /**
     * Redirect with literal strings
     */
    const REDIRECT_STATIC = 3;
    /**
     * High priority route, used for "emergency" pages or redirects
     */
    const PRIORITY_HIGH = 0;
    /**
     * Normal priority route, this is the most common
     */
    const PRIORITY_NORMAL = 1;
    /**
     * Low priority route, used for special 404s or very generic routes (pages)
     */
    const PRIORITY_LOW = 2;

    //}}}
    //{{{ private static function scan($force = FALSE)
    private static function scan($force = FALSE)
    {
        $found = FALSE;
        if (!self::$scanned || $force)
        {
            foreach (self::$routes as $priority => $routes) 
            {
                if ($found)
                {
                    break;
                }
                foreach ($routes as $route)
                {
                    if ($found)
                    {
                        break;
                    }
                    unset($ctrl, $redirect);
                    list($pattern, $replacement, $method, $source) = $route;
                    switch ($method)
                    {
                        case self::ROUTE_STATIC:
                            if (URI_PATH === $pattern)
                            {
                                $ctrl = $replacement;
                            }
                        break;
                        case self::ROUTE_PCRE:
                            if (preg_match($pattern, URI_PATH))
                            {
                                $ctrl = preg_replace($pattern, $replacement, URI_PATH);
                            }
                        break;
                        case self::REDIRECT_STATIC:
                            if (URI_PATH === $pattern)
                            {
                                $redirect = $replacement;
                            }
                        break;
                        case self::REDIRECT_PCRE:
                            if (preg_match($pattern, URI_PATH))
                            {
                                $redirect = preg_replace($pattern, $replacement, URI_PATH);
                            }
                        break;
                    }
                    if (isset($ctrl) || isset($redirect))
                    {
                        if (isset($ctrl) && is_readable($ctrl))
                        {
                            self::$pattern = $pattern;
                            self::$ctrl = $ctrl;
                            self::$method = $method;
                            self::$source = $source;
                            $found = TRUE;
                        }
                    }
                }
            }
            if (!self::$ctrl && !isset($redirect) && substr(URI_PATH, -1) !== '/')
            {
                $redirect = URI_PATH.'/';
                if (strlen(URI_PARAM))
                {
                    $redirect .= '?'.URI_PARAM;
                }
            }
            if (isset($redirect))
            {
                header('Location: '.$redirect);
                exit;
            }
            self::$scanned = !$force;
        }
    }

    //}}}
    //{{{ public static function controller($scan = FALSE)
    /**
     * Controller called for the matching route
     * @return string
     */
    public static function controller($scan = FALSE)
    {
        self::scan($scan);
        return self::$ctrl;
    }

    //}}}
    //{{{ public static function pattern($scan = FALSE)
    /**
     * Pattern of the matching route
     * @return string
     */
    public static function pattern($scan = FALSE)
    {
        self::scan($scan);
        return self::$pattern;
    }

    //}}}
    //{{{ public static function method($scan = FALSE)
    /**
     * @return int
     */
    public static function method($scan = FALSE)
    {
        self::scan($scan);
        return self::$method;
    }

    //}}}
    //{{{ public static function source($scan = FALSE)
    /**
     * Gets the source that provided the matching route
     * @return string|NULL
     */
    public static function source($scan = FALSE)
    {
        self::scan($scan);
        return self::$source;
    }

    //}}}
    //{{{ public static function add($pattern, $ctrl, $route = Router::ROUTE_STATIC, $priority = Router::PRIORITY_NORMAL, $source = NULL)
    /**
     * Register a single route for the system
     * If $route is router::ROUTE_PCRE, both $pattern and $ctrl can be in PCRE
     * string format for pcre_replace(). if $route is router::ROUTE_STATIC then
     * it will do a fast string compare to URI_PATH. $ctrl must always be an
     * absolute filename.
     *
     * @return void
     */
    public static function add($pattern, $ctrl, $route = Router::ROUTE_STATIC, $priority = Router::PRIORITY_NORMAL, $source = NULL)
    {
        self::$routes[$priority][] = array($pattern, $ctrl, $route, $source);
    }

    //}}}
}

?>
