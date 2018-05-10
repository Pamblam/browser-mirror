
class BMClient{
	constructor(sessionid, url, port=1337, role='master'){
		this.role = role;
		this.sessionid = sessionid;
		this.url = url;
		this.port = port;
		this.error_cb = e=>{throw e};
		this.connection = null;
		this.state = 'pending';
		this.cursor = null;
		window.WebSocket = window.WebSocket || window.MozWebSocket;
	}
	onError(error_cb){
		this.error_cb = error_cb;
		return this;
	}
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
						this.cursor.style.top = data.state.cursor.pos.y+"px";
						this.cursor.style.left = data.state.cursor.pos.x+"px";
					}
					break;
			}
		};
		this.connection.onopen = ()=>{
			this.state = 'open';
			this.connection.send(JSON.stringify({
				action: 'init_session',
				sessionid: this.sessionid,
				role: this.role
			}));
			var self = this;
			if(this.role === 'master'){
				document.addEventListener('mousemove', function(e){
					if(self.state != 'open') return;
					self.connection.send(JSON.stringify({
						action: 'set_state',
						state: {cursor: {pos:{x:e.clientX, y:e.clientY}}}
					}));
				});
			}else{
				document.querySelectorAll('*').forEach(ele=>{
					ele.style.cursor = 'none';
				});
				this.cursor = new Image;
				this.cursor.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAAulBMVEVHcEwAAAAAAADn5+f8/PwAAAAAAAAAAAAAAAAAAAAFBQXExMQAAADS0tIAAAC0tLRXV1czMzO+vr79/f3x8fEAAAC7u7uurq53d3dlZWXZ2dl6enoAAADLy8sAAABFRUWHh4ddXV3e3t6fn5+Ojo7Dw8Pw8PDU1NRubm6Li4va2tqgoKA5OTkiIiIAAAD///9CQkIQEBCFhYVUVFQfHx9qamovLy8FBQVbW1tKSkp1dXWVlZXIyMjw8PBBCnHbAAAALnRSTlMANE358xolAwgQYfyJ5Sz9wUv4+rd1vLwtcfarmdg9xIVjtfz+atmGylj9p4GpbsZfRQAAAF96VFh0UmF3IHByb2ZpbGUgdHlwZSBBUFAxAAAImeNKT81LLcpMVigoyk/LzEnlUgADYxMuE0sTS6NEAwMDCwMIMDQwMDYEkkZAtjlUKNEABZiYm6UBoblZspkpiM8FAE+6FWgbLdiMAAAA/UlEQVQ4jb2SSXLDIBBFJUBYINlSyvOcOIOdqUGDJctO7n+tQNnLhoUX6SX/1Sv6QxD864xE7AfUbuAnVDnhXkKVL1Pe8wLH53nkB07Zk/ACVZc8uAkLaN13E+pogEb3Q9cqw6qqdA1ugmnd1QBwWjsKY01jc4DzJ14Hq685wOUxwghW3HJoM5S4AT/KzhxZ1gCtYTTdfq9SiVyDFUV2sYpcbkKOGepkS61iTfAy2UeeTkqjSL44DixT8v5rFdMN2tSrJJF4OwMUC4l+C8HN8nvadlQtQ6yoXmxOZ8NELfLU+aJBPKKH1ZigVV81MzkmA+H5u3HEfbFR+MJ75g+IDB9Y/1bMbwAAAABJRU5ErkJggg==';
				this.cursor.style.position = 'absolute';
				this.cursor.style.zIndex = 99999999999;
				document.body.appendChild(this.cursor);
			}
			var int = setInterval(()=>{
				if (self.connection.readyState !== 1){
					self.error_cb(new Error("Connection to server lost"));
					clearInterval(int);
					self.state = 'closed';
				}
			}, 3000);
		};
	}
}