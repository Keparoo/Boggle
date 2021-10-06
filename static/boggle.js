const $body = $('body');

const handleGuess = async (e) => {
	e.preventDefault();
	console.debug('handleGuess');

	const word = $('#guess').val();
	console.log(word);

	const response = await axios.get('/check-word', { params: { word: word } });
	console.log('response', response);
};

$body.on('click', '#guessBtn', handleGuess);
