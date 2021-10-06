const $body = $('body');
const $message = $('#user-message');
const $score = $('#score');
let timeUp = false;
let score = 0;

const handleGuess = async (e) => {
	e.preventDefault();
	console.debug('handleGuess');

	if (timeUp) {
		console.log('Time is up');
		return;
	}

	const word = $('#guess').val();
	console.log(word);

	const response = await axios.get('/check-word', { params: { word: word } });
	const result = response.data.result;
	console.log(result);

	if (result === 'ok') {
		const wordValue = word.length;
		$message.text(`You found a word! ${wordValue} points.`);
		score += wordValue;
		$score.text(score);
	} else if (result === 'not-word') {
		$message.text(`${word} is not a word.`);
	} else {
		$message.text(`${word} is not on the board.`);
	}

	// result = 'ok' or 'not-word' or 'not-on-board'
};

setTimeout(() => {
	timeUp = true;
	console.log('setTimout');
}, 60000);

$body.on('click', '#guessBtn', handleGuess);

$score.text(score);
