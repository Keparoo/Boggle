const $body = $('body');
const $message = $('#user-message');
const $score = $('#score');
const $highscore = $('#high-score');
const $form = $('#word-form');
const gameDuration = 60000;
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

	const response = await axios.get('/check-word', { params: { word: word } });
	const result = response.data.result;

	if (result === 'ok') {
		const wordValue = word.length;
		$message.text(`${word} is worth ${wordValue} points.`);
		score += wordValue;
		$score.text(score);
	} else if (result === 'not-word') {
		$message.text(`${word} is not a word.`);
	} else {
		$message.text(`${word} is not on the board.`);
	}
	$form.trigger('reset');
};

const gameOver = async () => {
	console.debug('Game Over');

	timeUp = true;
	$message.text(`Game over! Your score is ${score}`);
	const response = await axios.post('/game-over', { score: score });
	$highscore.text(response.data.high_score);
};

setTimeout(gameOver, gameDuration);

$body.on('click', '#guessBtn', handleGuess);

$score.text(score);
