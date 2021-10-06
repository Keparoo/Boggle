const $body = $('body');

const handleGuess = async (e) => {
	e.preventDefault();
	console.debug('handleGuess');

	const word = $('#guess').val();
	console.log(word);

	const response = await axios.get('/check-word', { params: { word: word } });
	const result = response.data.result;
	console.log(result);
	// result = 'ok' or 'not-word' or 'not-on-board'
};

$body.on('click', '#guessBtn', handleGuess);
