
/**
 * Class to implement mirroring in the client
 * @type type
 */
const BMClient = (function(){
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	const bodyStyle = document.body.currentStyle || window.getComputedStyle(document.body);
	
	// Cursor images
	const textCursor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gULBC4OYw+UrwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABFSURBVBjT7cnBCYAwAEPRV+kKxVHE7VymrlJXEYeoB3uogjePfggk+QErJhwuEjYdSwsY3Klvwi8+FLHrwWNkzNjbN6KcULgHb8nigusAAAAASUVORK5CYII=';
	const defaultCursor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAMAAAAMT46wAAAAt1BMVEUAAAAAAADn5+f8/PwAAAAAAAAAAAAAAAAAAAAFBQXExMQAAADS0tIAAAC0tLRXV1czMzO+vr79/f3x8fEAAAC7u7uurq53d3dlZWXZ2dl6enoAAADLy8sAAABFRUWHh4ddXV3e3t6fn5+Ojo7Dw8Pw8PDU1NRubm6Li4va2tqgoKA5OTkiIiIAAAD///9CQkIQEBCFhYVUVFQfHx9qamovLy8FBQVbW1tKSkp1dXWVlZXIyMjw8PAzP/JcAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiBQoOFh+rC+oVAAAAkUlEQVQY05XPyw6CMBAF0KbuWkMTCCYKwRAXxsd0oKUI6P9/l31gtUvv7sxNZjKkIElkm7IvU552CQc1sYSI28jB0kTnSinU8PEGcdIA8KgDjXECmK+eOghgOTp2q2DMvnxKm8DRTpA298qzyxZXi7BZs4a6ej10Ebzsbc1ungdOyMvVP4/lTO4FjyzouSL/5g0GxxehF4eK3gAAAABJRU5ErkJggg==';
	const pointerCursor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAYAAACgADyUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gULBDAMWUDKXAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAI0SURBVDjLjZOxa1pRFId/9z7ladEqOOT5EBpJMURclNAlBHR4+QOkWLp0iUu3TtlahCyFbIGsLRVcAi2ZjIQOleKkeaBCFQRtmkGxpHmENnm+Z+7p0AZMkxq/6dzL+S6cc89hmCAcDj9QVfUTgK/9fj/T7Xa/YwZcqqp+qNfrVCqVxvPz8zvTkvlEzBhjQpZlSJIkARCzitfOQgjp6sFZxD+XnMPpdGqxWOxdJBJ5BOA+gHvTRAYAl5eX0DTt4d7e3rPFxcW3wWDwcyQSeen3+9UrxzEhCSICABAR5ubmsLCwAK/Xu5TP5zEYDJa2t7efG4bxtNPplLiqqkkAKQAq59z8Wx8uLi4AALZtQ1EUEJFzY2PDl06n38fj8ScOn89XzGQy0vHx8cdyuexhjCEUCmF5eRkAkEqlEAgEIITAyckJcrmcu1KpvEEymSTTNEWtVqNoNErNZpNuo9FokK7rNBqNaHV1dYREIvFia2uLiEjUajU6PT2laZimSSsrK7ZD1/Udy7Jkv9//OpvNYlY4APvo6KjcarVgWdbdAudgjDk4ALhcrsNisfjq4ODgTrHb7ZIQ4lACgPPzc+F2uz2KoqQSiYRXluX/iuvr61ar1Xr873bsNxqNW5sihCAiorW1tV+BQCA6OXKj8Xi8WSgUBlefj+urg93dXZydnW0yxr5NjhwNh8Mv1Wr1h2maim3bN5qi6zra7fa+YRg/J0UoioJerwdN08A5vyEahgGPx8MMw8Bvazg5Ze2f4+IAAAAASUVORK5CYII=';
	
	/**
	 * CSS Selector Generator, v1.0.4
	 * by Riki Fridrich <riki@fczbkk.com> (http://fczbkk.com)
	 * https://github.com/fczbkk/css-selector-generator/
	 * https://www.npmjs.com/package/css-selector-generator
	 * npm install this and use grunt to build it
	 */
	(function(){var a,b,c=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};a=function(){function a(a){null==a&&(a={}),this.options={},this.setOptions(this.default_options),this.setOptions(a)}return a.prototype.default_options={selectors:["id","class","tag","nthchild"]},a.prototype.setOptions=function(a){var b,c,d;null==a&&(a={}),c=[];for(b in a)d=a[b],this.default_options.hasOwnProperty(b)?c.push(this.options[b]=d):c.push(void 0);return c},a.prototype.isElement=function(a){return!(1!==(null!=a?a.nodeType:void 0))},a.prototype.getParents=function(a){var b,c;if(c=[],this.isElement(a))for(b=a;this.isElement(b);)c.push(b),b=b.parentNode;return c},a.prototype.getTagSelector=function(a){return this.sanitizeItem(a.tagName.toLowerCase())},a.prototype.sanitizeItem=function(a){var b;return b=a.split("").map(function(a){return":"===a?"\\"+":".charCodeAt(0).toString(16).toUpperCase()+" ":/[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(a)?"\\"+a:escape(a).replace(/\%/g,"\\")}),b.join("")},a.prototype.getIdSelector=function(a){var b,c;return b=a.getAttribute("id"),null==b||""===b||/\s/.exec(b)||/^\d/.exec(b)||(c="#"+this.sanitizeItem(b),1!==a.ownerDocument.querySelectorAll(c).length)?null:c},a.prototype.getClassSelectors=function(a){var b,c,d;return d=[],b=a.getAttribute("class"),null!=b&&(b=b.replace(/\s+/g," "),b=b.replace(/^\s|\s$/g,""),""!==b&&(d=function(){var a,d,e,f;for(e=b.split(/\s+/),f=[],a=0,d=e.length;d>a;a++)c=e[a],f.push("."+this.sanitizeItem(c));return f}.call(this))),d},a.prototype.getAttributeSelectors=function(a){var b,d,e,f,g,h,i;for(i=[],d=["id","class"],g=a.attributes,e=0,f=g.length;f>e;e++)b=g[e],h=b.nodeName,c.call(d,h)<0&&i.push("["+b.nodeName+"="+b.nodeValue+"]");return i},a.prototype.getNthChildSelector=function(a){var b,c,d,e,f,g;if(e=a.parentNode,null!=e)for(b=0,g=e.childNodes,c=0,d=g.length;d>c;c++)if(f=g[c],this.isElement(f)&&(b++,f===a))return":nth-child("+b+")";return null},a.prototype.testSelector=function(a,b){var c,d;return c=!1,null!=b&&""!==b&&(d=a.ownerDocument.querySelectorAll(b),1===d.length&&d[0]===a&&(c=!0)),c},a.prototype.getAllSelectors=function(a){var b;return b={t:null,i:null,c:null,a:null,n:null},c.call(this.options.selectors,"tag")>=0&&(b.t=this.getTagSelector(a)),c.call(this.options.selectors,"id")>=0&&(b.i=this.getIdSelector(a)),c.call(this.options.selectors,"class")>=0&&(b.c=this.getClassSelectors(a)),c.call(this.options.selectors,"attribute")>=0&&(b.a=this.getAttributeSelectors(a)),c.call(this.options.selectors,"nthchild")>=0&&(b.n=this.getNthChildSelector(a)),b},a.prototype.testUniqueness=function(a,b){var c,d;return d=a.parentNode,c=d.querySelectorAll(b),1===c.length&&c[0]===a},a.prototype.testCombinations=function(a,b,c){var d,e,f,g,h,i,j;for(i=this.getCombinations(b),e=0,g=i.length;g>e;e++)if(d=i[e],this.testUniqueness(a,d))return d;if(null!=c)for(j=b.map(function(a){return c+a}),f=0,h=j.length;h>f;f++)if(d=j[f],this.testUniqueness(a,d))return d;return null},a.prototype.getUniqueSelector=function(a){var b,c,d,e,f,g;for(g=this.getAllSelectors(a),e=this.options.selectors,c=0,d=e.length;d>c;c++)switch(f=e[c]){case"id":if(null!=g.i)return g.i;break;case"tag":if(null!=g.t&&this.testUniqueness(a,g.t))return g.t;break;case"class":if(null!=g.c&&0!==g.c.length&&(b=this.testCombinations(a,g.c,g.t)))return b;break;case"attribute":if(null!=g.a&&0!==g.a.length&&(b=this.testCombinations(a,g.a,g.t)))return b;break;case"nthchild":if(null!=g.n)return g.n}return"*"},a.prototype.getSelector=function(a){var b,c,d,e,f,g,h,i,j,k;for(b=[],h=this.getParents(a),d=0,f=h.length;f>d;d++)c=h[d],j=this.getUniqueSelector(c),null!=j&&b.push(j);for(k=[],e=0,g=b.length;g>e;e++)if(c=b[e],k.unshift(c),i=k.join(" > "),this.testSelector(a,i))return i;return null},a.prototype.getCombinations=function(a){var b,c,d,e,f,g,h;for(null==a&&(a=[]),h=[[]],b=d=0,f=a.length-1;f>=0?f>=d:d>=f;b=f>=0?++d:--d)for(c=e=0,g=h.length-1;g>=0?g>=e:e>=g;c=g>=0?++e:--e)h.push(h[c].concat(a[b]));return h.shift(),h=h.sort(function(a,b){return a.length-b.length}),h=h.map(function(a){return a.join("")})},a}(),("undefined"!=typeof define&&null!==define?define.amd:void 0)?define([],function(){return a}):(b="undefined"!=typeof exports&&null!==exports?exports:this,b.CssSelectorGenerator=a)}).call(this);
	
	/**
	 * 'private/static' The state of the browser
	 * @type State
	 */
	var state = {
		cursor: {
			type: 'default',
			pos: {
				x: 0,
				y: 0
			}
		},
		events: {},
		scroll: {ele: null, x:0, y:0}
	};
	
	/**
	 * Class that handles onth client and master connections to server
	 * @type BMClient
	 */
	class BMClient{
		
		/**
		 * Constructor
		 * @param {String|Number} sessionid - Developer defined ID for this session.
		 * @param {String} url - URL where the bm-server is running.
		 * @param {String} role - master|client
		 * @param {Number} port - Port on which the server is running.
		 * @returns {BMClient}
		 */
		constructor(sessionid, url, role='master', port=1337){
			this.session = {
				slaves: 0,
				members: 0,
				started: false,
			};
			this.role = role;
			this.sessionid = sessionid;
			this.url = url;
			this.port = port;
			this.error_cb = e=>{throw e};
			this.session_cb = data=>{};
			this.state_change_cb = state=>{};
			this.session_error_cb = data=>{this.error_cb(new Error(data.message))};
			this.connection = null;
			this.state = 'pending';
			this.cursor = null;
			this.allElementsCBs = [];
			this.onAllSynced = function(){};
			this._secure=false;
			new MutationObserver(mutationsList=>{
				for (var mutation of mutationsList) {
					if (mutation.type == 'childList') {
						for (var i = mutation.addedNodes.length; i--; ){
							if(1 != mutation.addedNodes[i].nodeType) continue;
							let els = [mutation.addedNodes[i], ...Array.from(mutation.addedNodes[i].querySelectorAll('*'))];
							for(let n=els.length; n--;){
								this.allElementsCBs.forEach(fn=>fn(els[n], true));
							}
						}
					}
				}
			}).observe(document.getElementsByTagName('body')[0], {childList: true, subtree: true});
		}
		
		/**
		 * Tell BMClient to attempt to connect over wss:// instead of ws://
		 * @returns {BMClient}
		 */
		secure(){
			this._secure=true;
			return this;
		}
		
		/**
		 * Set a function to handle all thrown errors
		 * @param {Function} error_cb - A function that will intercept all errors
		 * @returns {BMClient}
		 */
		onError(error_cb){
			this.error_cb = error_cb;
			return this;
		}
		
		/**
		 * Set a function to handle all session updates
		 * @param {Function} session_cb - A function that will intercept all updates
		 * @returns {BMClient}
		 */
		onSessionUpdate(session_cb){
			this.session_cb = session_cb;
			return this;
		}

		/**
		 * Set a function to handle all session errors
		 * @param {Function} session_error_cb - A function that will intercept all session erros
		 * @returns {BMClient}
		 */
		onSessionError(session_error_cb){
			this.session_error_cb = session_error_cb;
			return this;
		}
		
		/**
		 * Register a callback to be called whenever state change is triggered
		 * @param {Function} state_change_cb - A function that will be called whenver state is changed
		 * @returns {BMClient}
		 */
		onStateChange(state_change_cb){
			if(this.role == 'master') return this;	
			this.state_change_cb = state_change_cb;
			return this;
		}
		
		/**
		 * Broadcast a state change from master to all slaves	
		 * @returns {BMClient}
		 */
		setState(state){
			if(this.role !== 'master') return this;
			this.connection.send(JSON.stringify({
				action: 'set_passthru_state',
				state: state
			}));
			return this;
		}
		
		/**
		 * Start the session (called on master only)
		 * @param {Boolean}	syncBrowserSizes - If set to true will sync the size of all browsers
		 * @returns {BMClient}
		 */
		start(syncBrowserSizes=false){
			if(this.role !== 'master') return this;
			const start_session = ()=>{
				this.connection.send(JSON.stringify({
					action: 'start_session',
				}));
			};
			if(syncBrowserSizes) _syncBrowserSizes.call(this).then(start_session);
			else start_session();
			return this;
		}
		
		/**
		 * Start mirroring client or master
		 * @returns {BMClient}
		 */
		connect(forceSameBrowser=false){
			if(!window.WebSocket){
				this.error_cb(new Error("Browser doesn't support websockets"));
				return this;
			}
			var protocol=this._secure?"wss":"ws";
			this.connection = new WebSocket(`${protocol}://${this.url}:${this.port}`);
			this.connection.onerror = ()=>this.error_cb(new Error('Can\'t establish connection to the server.'));
			this.connection.onmessage = data=>{
				data = JSON.parse(data.data);
				switch(data.action){
					case 'set_passthru_state':
						this.state_change_cb(data.state);
						break;
						
					case 'request_dims':
						this.connection.send(JSON.stringify({
							action: 'report_dims',
							dimensions: {
								w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
								h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) 
							}
						}));
						break;
					
					case 'all_members_resized':
						if(this.role !== 'master') return;
						this.onAllSynced();
						break;
					
					case 'resize':
						_resizeViewport.call(this, data.dimensions.w, data.dimensions.h)
						break;
					
					case 'init_browser_resize':
						_resizeViewport.call(this, data.dimensions.w, data.dimensions.h);
						_listenForBrowserSizeChanges.call(this);
						this.connection.send(JSON.stringify({
							action: 'resize_ready'
						}));
						break;
						
					case 'set_state':
						if(data.state.cursor.pos){
							state = data.state;
							_setSlaveState.call(this);
						}
						break;
						
					case 'session_error':
						_giveSlaveCursorBack.call(this);
						this.session_error_cb(data);
						break;
						
					case 'session_update':
						this.session.slaves = data.slaves;
						this.session.members = data.members;
						this.session.started = data.started;	
						this.session_cb(data);
						if(data.message === 'Session has started.'){
							if(this.role === 'master'){
								_monitorMasterBrowserState.call(this);
							}else{
								_hideSlaveBrowserCursor.call(this);
							}
							_createSlaveBroswerCursor.call(this);
						}
						break;
				}
			};
			this.connection.onopen = ()=>{
				this.state = 'open';
				_initSession.call(this, forceSameBrowser);
				_monitorServerConnectionState.call(this);
			};
			return this;
		}
	}
	
	/**
	 * Make all browsers the same size
	 */
	function _syncBrowserSizes(){
		return new Promise(done=>{
			this.onAllSynced = done;
			this.connection.send(JSON.stringify({
				action: 'sync_dims',
				dimensions: {
					w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) 
				}
			}));
		});
	}
	
	/**
	 * 'private' method for initiating the session with the server
	 * @returns {BMClient}
	 */
	function _initSession(forceSameBrowser){
		this.connection.send(JSON.stringify({
			action: 'init_session',
			sessionid: this.sessionid,
			role: this.role,
			browser: _getBrowserName(),
			forceBrowser: forceSameBrowser && this.role == 'master'
		}));
		return this;
	}
	
	/**
	 * 'private' method to monitor the state of the connection of the server
	 * @returns {BMClient}
	 */
	function _monitorServerConnectionState(){
		var self = this;
		var int = setInterval(()=>{
			if (self.connection.readyState !== 1){
				self.error_cb(new Error("Connection to server lost"));
				clearInterval(int);
				self.state = 'closed';
			}
		}, 3000);
		return this;
	}
	
	/**
	 * 'prive' method for creating faux mouse cursor in slave browser
	 * @returns {BMClient}
	 */
	function _createSlaveBroswerCursor(){
		if(this.role === 'slave'){
			this.cursor = new Image;
			this.cursor.src = defaultCursor;
			this.cursor.style.position = 'absolute';
			this.cursor.style.zIndex = 99999999999;
			this.cursor.style.top = 0;
			this.cursor.style.left = 0;
			document.body.appendChild(this.cursor);
		}else{
			var cursor = new Image;
			cursor.src = defaultCursor;
			cursor.style.position = 'absolute';
			cursor.style.zIndex = -99999999999;
			cursor.style.top = 0;
			cursor.style.left = 0;
			cursor.style.opacity = 0;
			document.body.appendChild(cursor);
		}
		return this;
	}
	
	/**
	 * 'private' method to give client cursor control back
	 * @returns {BMClient}
	 */
	function _giveSlaveCursorBack(){
		if(this.cursor) this.cursor.style.display = 'none';
		document.body.style.cursor = 'default';
		document.querySelectorAll('*').forEach(ele=>{
			ele.style.cursor = 'default';
		});
		return this;
	}
	
	/**
	 * 'private' method for hiding the mouse cursor in slave browser
	 * @returns {BMClient}
	 */
	function _hideSlaveBrowserCursor(){
		document.body.style.cursor = 'none';
		document.querySelectorAll('*').forEach(ele=>{
			ele.style.cursor = 'none';
		});
		return this;
	}
	
	/**
	 * 'private' method for monitoring mouse cursor changes
	 * @returns {BMClient}
	 */
	function _monitorMasterMouseCursor(){
		if(this.role == 'slave') return this;
		document.addEventListener('mouseover',function(e){
			var cursor = e.target.style.cursor;
			if(!~['default', 'pointer', 'text'].indexOf(cursor)) cursor = 'default';
			if(!e.target.style.cursor){
				if(e.target.tagName === 'A') cursor = 'pointer';
				if(e.target.tagName === 'TEXTAREA') cursor = 'text';
				if(e.target.tagName === 'INPUT' && !~['radio', 'checkbox'].indexOf((e.target.getAttribute('type')||"").toLowerCase())) cursor = 'text';
			}
			state.cursor.type = cursor;
		},false);
		return this;
	}
	
	/**
	 * 'private' method for monitoring browser state of the master
	 * and updateing state on the slaves
	 * @returns {BMClient}
	 */
	function _monitorMasterBrowserState(){
		if(this.role == 'slave') return this;
		var self = this;
		
		_monitorMasterMouseCursor.call(self);
		document.addEventListener('mousemove', function(e){
			if(self.state != 'open') return;
			state.cursor.pos = {x:e.clientX-parseFloat(bodyStyle['margin-left']), y:e.clientY-parseFloat(bodyStyle['margin-top'])};
			_broadcastMasterState.call(self);
		});
		
		_onAllElements.call(this, function(ele){
			
			if(document !== ele && !ele.parentElement) return;
			var tgt = new CssSelectorGenerator().getSelector(ele);
			
			// form events
			if(ele.tagName === 'FORM'){
				ele.addEventListener('submit', function(e){
					if(e.target !== ele) return;
					state.events.Event = {
						target: tgt,
						type: 'submit'
					};
					_broadcastMasterState.call(self);
					delete state.events.Event;
				});
			}
			
			// scroll events
			ele.addEventListener('scroll', function(e){
				if(e.target !== ele) return;
				state.scroll.ele = tgt;
				state.scroll.y = ele.scrollTop || window.scrollY;
				state.scroll.x = ele.scrollLeft || window.scrollX;
				_broadcastMasterState.call(self);
			});
			
			// Focus events
			['focus', 'blur', 'focusin', 'focusout'].forEach(evtType=>{
				ele.addEventListener(evtType, function(e){
					if(e.target !== ele) return;
					state.events.FocusEvent = {
						target: tgt,
						type: evtType
					};
					_broadcastMasterState.call(self);
					delete state.events.FocusEvent;
				});
			});
			
			// Keyboard events
			['keydown', 'keypress', 'keyup'].forEach(evtType=>{
				ele.addEventListener(evtType, function(e){
					if(e.target !== ele) return;
					state.events.KeyboardEvent = {
						target: tgt,
						type: evtType,
						key: e.key,
						altKey: e.altKey,
						ctrlKey: e.ctrlKey,
						shiftKey: e.shiftKey,
						metaKey: e.metaKey,
						value: ~['TEXTAREA','INPUT'].indexOf(ele.tagName||'BODY')?ele.value:false
					};
					_broadcastMasterState.call(self);
					delete state.events.KeyboardEvent;
				});
			});
			
			// Mouse events
			['click', 'dblclick', 'mouseup', 'mousedown'].forEach(evtType=>{
				ele.addEventListener(evtType, function(e){
					if(e.target !== ele) return;
					state.events.MouseEvent = {
						target: tgt,
						type: evtType
					};
					_broadcastMasterState.call(self);
					delete state.events.MouseEvent;
				});
			});
		});
		
		return this;
	}
	
	/**
	 * 'private' Set the state of the slave browser
	 * @returns {BMClient}
	 */
	function _setSlaveState(){
		if(this.role == 'master') return this;
		var yofst = !state.scroll.ele?state.scroll.y:0;
		var xofst = !state.scroll.ele?state.scroll.x:0;
		if(this.cursor){
			this.cursor.style.top = (state.cursor.pos.y + yofst + parseInt(bodyStyle['margin-top']))+"px";
			this.cursor.style.left = (state.cursor.pos.x + xofst + parseInt(bodyStyle['margin-left']))+"px";
		}
		
		if(state.cursor.type === 'pointer') this.cursor.src = pointerCursor;
		else if(state.cursor.type === 'text') this.cursor.src = textCursor;
		else this.cursor.src = defaultCursor;
		
		if(!state.scroll.ele || !document.querySelector(state.scroll.ele)){
			window.scrollTo(state.scroll.x, state.scroll.y);
		}else{
			document.querySelector(state.scroll.ele).scrollLeft = state.scroll.x;
			document.querySelector(state.scroll.ele).scrollTop = state.scroll.y;
		}
		
		if(state.events){
			for(let evtConstructor in state.events){
				let event = state.events[evtConstructor];
				let type = event.type;
				let target = event.target;
				let tgt = document.querySelector(target);
				if(!tgt) continue;
				let evt;
				switch(evtConstructor){
					case 'FocusEvent':
						evt = new FocusEvent(type, {
							bubbles: true,
							cancelable: true,
							view: window
						});
						if(type == 'focusin' || type == 'focus') tgt.focus();
						break;
					case 'KeyboardEvent':
						evt = new KeyboardEvent("keydown");
						evt.key=event.key;
						evt.keyCode=evt.key.charCodeAt(0);
						evt.which=evt.keyCode;
						evt.altKey=event.altKey;
						evt.ctrlKey=event.ctrlKey;
						evt.shiftKey=event.shiftKey;
						evt.metaKey=event.metaKey;
						evt.bubbles=true;
						if(event.value !== false) tgt.value = event.value;
						break;
					case 'MouseEvent':
						evt = new MouseEvent(type, {
							bubbles: true,
							cancelable: true,
							view: window
						});
						break;
					default:
						evt = new Event(type, {
							bubbles: true,
							cancelable: true
						});
				}
				tgt.dispatchEvent(evt);
				delete state.events[evtConstructor];
			}
		}
		return this;
	}
	
	/**
	 * Send the master state to the server
	 * @returns {BMClient}
	 */
	function _broadcastMasterState(){
		this.connection.send(JSON.stringify({
			action: 'set_state',
			state: state
		}));
		return this;
	}
	
	/**
	 * run a function on all existing elements now, and run it on new elements as they are added
	 * @params {function} fn
	 * @returns {BMClient}
	 */
	function _onAllElements(fn){
		this.allElementsCBs.push(fn);
		fn(document);
		Array.from(document.querySelectorAll('*')).forEach(fn);
		return this;
	}
	
	/**
	 * Given a url, a key and optionally a value
	 * will return the url with the added key/value pair
	 * @param {string} url
	 * @param {string} key
	 * @param {value} optional value
	 * @return {string} new url
	 */
	function setQSParam(url, key, value=''){
		var qs = url.substr(~url.indexOf("?")?url.indexOf("?")+1:url.length);
		var hash = qs.substr(~url.indexOf('#')?qs.lastIndexOf('#'):qs.length);
		url = url.substr(0, url.length-hash.length);
		qs = qs.substr(0, qs.length-hash.length);
		var sep = !qs&&url.substr(-1)!=='?'?'?':!!qs&&url.substr(-1)!=='&'?'&':'';
		var added=0,nqs=[],k,v,parts; 
		qs.split('&').forEach(kvp=>{
			if(!kvp) return;
			[k,v]=kvp.split('=');
			if(k==key){ 
				v=value;
				added=1;
			}
			nqs.push(k+"="+(v?encodeURIComponent(v):''));
		});
		qs=nqs.join('&');
		if(!added) qs+=(sep+key+"="+(value?encodeURIComponent(value):''));
		var baseurl = url.substr(0,~url.indexOf("?")?url.indexOf("?")+1:url.length);
		return baseurl+qs+hash;
	}

	/**
	 * Given a url and a key will return the value of that key in the querystring if it exists
	 * @param {string} name - the name of the key
	 * @param {string} url - the url from which to pull the value
	 * @return {string} - the value of the key in the url
	 */
	function getParameterByName(name, url){
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	/**
	 * Set the page up to be viewed in an adjustable viewport
	 */
	function initViewport(){
		if(getParameterByName('bm-viewport', window.location.href)) return;
		var cw = document.documentElement.clientWidth; 
		var ch = document.documentElement.clientHeight;
		var url = setQSParam(window.location.href, 'bm-viewport', 1);
		var html = `<!doctype hmtl>
		<html>
		<head>
			<style>
				body, html{
					margin: 0;
					padding: 0;
					height: 100%;
					width:100%;
					background: #86898e;
					overflow: hidden;
				}
				iframe{
					border: 0;
					margin: 0;
					width: ${cw}px;
					height: ${ch}px;
					background-color: white;
					position: absolute;
					top: 0;
					left: 0;
				}
			</style>
		</head>
		<body>
			<iframe id='bmframe' src="${url}" seamless="seamless" allowfullscreen="allowfullscreen"></iframe>
		</body>
		</html>`;
		stop();
		document.close();
		document.documentElement.innerHTML = html;
	}
	
	/**
	 * Resize the viewport
	 */
	function _resizeViewport(w, h){
		var cw = window.parent.document.documentElement.clientWidth;
		var ch = window.parent.document.documentElement.clientHeight;
		var iframe = window.parent.document.getElementById('bmframe');
		iframe.style.width = w+"px";
		iframe.style.height = h+"px";
		iframe.style.top = ((ch-h)/2)+"px";
		iframe.style.left = ((cw-w)/2)+"px";
	}
	
	/**
	 * Listen for viewport size changes to sync all with the smallest one
	 */
	function _listenForBrowserSizeChanges(){
		var self = this;
		parent.window.addEventListener('resize', function(){
			var w = window.parent.document.documentElement.clientWidth;
			var h = window.parent.document.documentElement.clientHeight;
			self.connection.send(JSON.stringify({
				action: 'resize_all',
				dimensions: {w:w, h:h}
			}));
		});
	}
	
	/**
	 * Get the name of the current browser
	 * @return {string} - the name of the current browser
	 */
	function _getBrowserName(){
		var nAgt = navigator.userAgent;
		var browserName = navigator.appName;
		var nameOffset, verOffset;
		if ((verOffset = nAgt.indexOf("Opera")) != - 1) browserName = "Opera";
		else if ((verOffset = nAgt.indexOf("MSIE")) != - 1) browserName = "Microsoft Internet Explorer";
		else if ((verOffset = nAgt.indexOf("Chrome")) != - 1) browserName = "Google Chrome";
		else if ((verOffset = nAgt.indexOf("Safari")) != - 1) browserName = "Safari";
		else if ((verOffset = nAgt.indexOf("Firefox")) != - 1) browserName = "Mozilla Firefox";
		else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
			browserName = nAgt.substring(nameOffset, verOffset);
			if (browserName.toLowerCase() == browserName.toUpperCase()) browserName = navigator.appName;
		}
		return browserName;
	}
	
	initViewport();
	
	const f = function(sessionid, url, role='master', port=1337){
		return new BMClient(sessionid, url, role, port);
	};
	f.getSelector = ele=>new CssSelectorGenerator().getSelector(ele);
	f.getBrowserName = _getBrowserName;
	return f;
})();