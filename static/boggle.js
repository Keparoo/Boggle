const $body = $('body');

const handleGuess = async (e) => {
	console.debug('handleGuess');

	e.preventDefault();

	const word = $('#guess').val();
	console.log(word);

	const response = axios.post('/check-word', { params: { word: word } });
	console.log('response', response);
};

$body.on('submit', '#guessBtn', handleGuess);
