// variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners
//-----------------------------------------------------------------------------------

eventListeners();

function eventListeners() {
	// When we send form
	document.querySelector('#formulario').addEventListener('submit', agregarTweet);

	// Delete tweets
	listaTweets.addEventListener('click', deleteTweet);

	// Loaded content
	document.addEventListener('DOMContentLoaded', localStorageLoader);
}


//Functions
//-----------------------------------------------------------------------------------


//add tweet from form
function agregarTweet(e) {
	e.preventDefault();
	// Read textarea value
	const tweet = document.getElementById('tweet').value;
	//Create delete bottom
	const botonBorrar = document.createElement('a');
	botonBorrar.classList = 'borrar-tweet';
	botonBorrar.innerText = 'X';

	// create element and add to list
	const li = document.createElement('li');
	li.innerText = tweet;
	if (li.textContent) {
		li.appendChild(botonBorrar);
		listaTweets.appendChild(li);
	} else {
		alert('You must write a tweet in the text area')
	}
	// Add to local storage
	addTweetLocalStorage(tweet);
}
// Delete tweet from DOM
function deleteTweet(e) {
	e.preventDefault();
	//delegation to delete tweet
	if(e.target.className === 'borrar-tweet') {
		if(confirm(`Sure? You want to delete this tweet`) === true) {
			e.target.parentElement.remove();
			alert('Tweet Deleted')

			deleteTweetFromLocalStorage(e.target.parentElement.innerText);
		}
	}
}
//Add tweet to local storage function
function addTweetLocalStorage(tweet) {
	let tweets;
	tweets = getTweetsFromLocalStorage();

	// Add new tweet
	tweets.push(tweet);

	// convert string to array for local storage
	localStorage.setItem('tweets', JSON.stringify(tweets))

}
// get local storage elements and return array
function getTweetsFromLocalStorage() {
	let tweets;
	if(localStorage.getItem('tweets') === null) {
		tweets = [];
	} else {
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}
	return tweets;
}

// Shoe local storage data in the tweet list html

function localStorageLoader() {
	let tweets;

	tweets = getTweetsFromLocalStorage();

	tweets.forEach(function(tweet) {
		const botonBorrar = document.createElement('a');
		botonBorrar.classList = 'borrar-tweet';
		botonBorrar.innerText = 'X';

		// create element and add to list
		const li = document.createElement('li');
		li.innerText = tweet;
		if (li.textContent) {
			// add delete buton to the tweet
			li.appendChild(botonBorrar);
			//add tweet to the tweets list
			listaTweets.appendChild(li);
		}
	});
}
// delete tweet from local storage
function deleteTweetFromLocalStorage(tweet) {
	let tweets, deleteTweet;
	// delete X btn
	deleteTweet = tweet.substring(0, tweet.length - 1);

	tweets = getTweetsFromLocalStorage();

	tweets.forEach(function(tweet, index) {
		if (deleteTweet === tweet) {
			tweets.splice(index, 1)
		}
	});
	localStorage.setItem('tweets', JSON.stringify(tweets));
}