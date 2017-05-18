
var button = document.querySelector('#action');
var keyword = document.querySelector('#keyword');
var wResults = document.querySelector('#wordnik-results');
var imageWrapper = document.querySelector('#image-wrapper');
var yuge = document.querySelector('#yuge');

function getWordnikData(keyword) {
	sendLogRequest(keyword);

	wResults.innerHTML = '';
	const endpoint = 'http://api.wordnik.com:80/v4/word.json/'+ keyword +'/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=' + wordnik_key;
	ajax(endpoint, 'GET', function (response) {
		if(response.length) {
			displayWordnikResults(response);
		} else {
			wResults.innerHTML = '<h3>Nothing found :(</h3>';
		}
	});
}

function displayWordnikResults(relatedData) {
	relatedData.forEach(function(relationship){
		var header = document.createElement('h3');
		header.innerText = relationship.relationshipType;
		wResults.appendChild(header);

		relationship.words.forEach(function(word){
			var anchor = document.createElement('a');
			anchor.innerText = word;
			anchor.href = ''
			anchor.addEventListener('click', function (e) {
				e.preventDefault()
				getGoogleData( word );
			});
			wResults.appendChild(anchor);
		});
	});
}

function getGoogleData(keyword) {
	var huge = ( yuge.checked ) ? '&imgSize=huge' : '';
	const endpoint = 'https://www.googleapis.com/customsearch/v1?q='+ keyword +'&cx=' + google_se + huge + '&searchType=image&key=' + google_api_key
	ajax(endpoint, 'GET', function (response) {
		displayGoogleResults(response);
	});
}

function displayGoogleResults(gData) {
	gData.items.forEach(function (item) {
		var img = document.createElement('img');
		img.src = item.image.thumbnailLink;

		var anchor = document.createElement('a');
		anchor.href = item.image.contextLink;
		anchor.target = '_blank';

		anchor.appendChild(img);
		imageWrapper.appendChild(anchor);
	});
}


function sendLogRequest(input) {
	ajax('/logger', 'POST', function (res) {
		console.log(res);		
	}, {keyword:input});
}

button.addEventListener('click', function () {
	getWordnikData(keyword.value);
});

keyword.addEventListener('keyup', function (e) {
	if(e.keyCode == 13) { // Enter key
		getWordnikData(keyword.value)
	}
});