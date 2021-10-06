const $body = $('body');
const $message = $('#user-message');

const handleGuess = async (e) => {
	e.preventDefault();
	console.debug('handleGuess');

	const word = $('#guess').val();
	console.log(word);

	const response = await axios.get('/check-word', { params: { word: word } });
	const result = response.data.result;
	console.log(result);
	$message.text('The word you guessed is ' + result);

	// result = 'ok' or 'not-word' or 'not-on-board'
};

$body.on('click', '#guessBtn', handleGuess);
