const $body = $('body');
const $message = $('#user-message');
const $score = $('#score');
const $highscore = $('#high-score');
const $form = $('#word-form');
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
	$form.trigger('reset');

	// result = 'ok' or 'not-word' or 'not-on-board'
};

const gameOver = async () => {
	timeUp = true;
	console.log('Game Over');
	$message.text(`Game over! Your score is ${score}`);
	const response = await axios.post('/game-over', { score: score });
	console.log(response);
	$highscore.text(response.data.high_score);
};

setTimeout(gameOver, 48000);

$body.on('click', '#guessBtn', handleGuess);

$score.text(score);
