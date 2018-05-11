
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
		events: {}
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
			this.role = role;
			this.sessionid = sessionid;
			this.url = url;
			this.port = port;
			this.error_cb = e=>{throw e};
			this.connection = null;
			this.state = 'pending';
			this.cursor = null;
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
		 * Start mirroring client or master
		 * @returns {BMClient}
		 */
		start(){
			if(!window.WebSocket){
				this.error_cb(new Error("Browser doesn't support websockets"));
				return this;
			}
			this.connection = new WebSocket(`ws://${this.url}:${this.port}`);
			this.connection.onerror = this.error_cb;
			this.connection.onmessage = data=>{
				data = JSON.parse(data.data);
				switch(data.action){
					case 'set_state':
						if(data.state.cursor.pos){
							state = data.state;
							_setSlaveState.call(this);
						}
						break;
				}
			};
			this.connection.onopen = ()=>{
				this.state = 'open';
				_initSession.call(this);
				if(this.role === 'master'){
					_monitorMasterBrowserState.call(this);
				}else{
					_hideSlaveBrowserCursor.call(this);
					_createSlaveBroswerCursor.call(this);
				}
				_monitorServerConnectionState.call(this);
			};
		}
	}
	
	/**
	 * 'private' method for initiating the session with the server
	 * @returns {undefined}
	 */
	function _initSession(){
		this.connection.send(JSON.stringify({
			action: 'init_session',
			sessionid: this.sessionid,
			role: this.role
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
		this.cursor = new Image;
		this.cursor.src = defaultCursor;
		this.cursor.style.position = 'absolute';
		this.cursor.style.zIndex = 99999999999;
		this.cursor.style.top = 0;
		this.cursor.style.left = 0;
		document.body.appendChild(this.cursor);
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
		
		// Focus events
		['focus', 'blur', 'focusin', 'focusout'].forEach(evtType=>{
			document.addEventListener(evtType, function(e){
				state.events.FocusEvent = {
					target: new CssSelectorGenerator().getSelector(e.target),
					type: evtType
				};
				_broadcastMasterState.call(self);
				delete state.events.FocusEvent;
			});
		});
		
		// Keyboard events
		['keydown', 'keypress', 'keyup'].forEach(evtType=>{
			document.addEventListener(evtType, function(e){
				state.events.KeyboardEvent = {
					target: new CssSelectorGenerator().getSelector(e.target),
					type: evtType,
					key: e.key,
					altKey: e.altKey,
					ctrlKey: e.ctrlKey,
					shiftKey: e.shiftKey,
					metaKey: e.metaKey,
					value: ~['TEXTAREA','INPUT'].indexOf(e.target.tagName)?e.target.value:false
				};
				_broadcastMasterState.call(self);
				delete state.events.KeyboardEvent;
			});
		});
		
		// Mouse events
		['click', 'dblclick', 'mouseup', 'mousedown'].forEach(evtType=>{
			document.addEventListener(evtType, function(e){
				state.events.MouseEvent = {
					target: new CssSelectorGenerator().getSelector(e.target),
					type: evtType
				};
				_broadcastMasterState.call(self);
				delete state.events.MouseEvent;
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
		this.cursor.style.top = (state.cursor.pos.y+parseInt(bodyStyle['margin-top']))+"px";
		this.cursor.style.left = (state.cursor.pos.x+parseInt(bodyStyle['margin-left']))+"px";
		
		if(state.cursor.type === 'pointer') this.cursor.src = pointerCursor;
		else if(state.cursor.type === 'text') this.cursor.src = textCursor;
		else this.cursor.src = defaultCursor;
		
		if(state.events){
			for(let evtConstructor in state.events){
				let event = state.events[evtConstructor];
				let type = event.type;
				let target = event.target;
				let tgt = document.querySelector(target);
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
	
	return function(sessionid, url, role='master', port=1337){
		return new BMClient(sessionid, url, role, port);
	};
})();