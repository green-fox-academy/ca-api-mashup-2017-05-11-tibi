'use strict';

function ajax(url, callback) {
	var xhr = new XMLHttpRequest(),
	method = "GET";

	xhr.open(method, url, true);

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
	xhr.send();
}
