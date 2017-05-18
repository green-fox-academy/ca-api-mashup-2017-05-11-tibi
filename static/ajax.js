'use strict';

function ajax(url, method, callback, data) {
	var xhr = new XMLHttpRequest();

	xhr.open(method, url, true);
	if( data ) {
		xhr.setRequestHeader('Content-type', 'application/json');
	}
	xhr.onreadystatechange = function () {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			if(xhr.status === 200) {
				var rsp = JSON.parse( xhr.response );
				callback(rsp);
			} else {
				new Error('API PANIC!!!');
				console.log(xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(data));
}
