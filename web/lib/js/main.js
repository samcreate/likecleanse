/*! main class
 * @depends jquery/jquery-1.8.0.min.js
 */
var ubme  = ubme || {};
ubme.main = function () {
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================
	var _queue = [];
	var _app_vars = "app vars not set!";
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function () {

			debug.time('Initialization time');

			debug.group('# [main.js]');
				debug.log('- initialized');
			debug.groupEnd();

			$('html').removeClass('no-js');

			self.appVARS(window._app_vars);

			_run();
		},
		queue : function (f) {
			if (arguments.length > 0) {
				for (var i = 0; i < arguments.length; i++) {
					_queue.push(arguments[i]);
				}
			}
		},
		appVARS : function (p_vars) {
			if (p_vars) {
				_app_vars = p_vars;
			} else {
				return _app_vars;
			}
		},
		purgatory : function (p_func, p_options) {
			return new purgatoryCell(p_func,p_options);
		}
	
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	
	function _run () {
		//everything is init'ed here
		
		for (var i = 0; i < _queue.length; i++) {
			try {
				_queue[i]();
			} catch(e) {
				debug.error(e);
			}
        }
		debug.timeEnd('Initialization time');
	}
	

	function purgatoryCell (p_func, p_options) {
		p_options = p_options || {};
		this.count = 0;
		this.func = p_func;
		this.amount = p_options.amount || 10;
		this.time = p_options.time || 1000;
		this._scope = this;
		(function (_functorun, _o) {
			try {
				_functorun();
			} catch (e) {
				if (_o.scope.count >= _o.amount) { debug.warn("purgatory function has been tried "+_o.scope.count+" times. ",_functorun); return;}
				var _parent = arguments.callee;
				var _t = setTimeout(function () {
							_o.scope.count++;
							_parent.call(_o.scope, _functorun,_o);
						}, _o.time);
			}
		} (this.func, {scope: this._scope, amount: this.amount, time: this.time}));
	}


}();

/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */

window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();

$(document).ready(function () {
	ubme.main.init();
});

