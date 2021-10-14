const $body = $('body');
const $message = $('#user-message');
const $score = $('#score');
const $highscore = $('#high-score');
const $form = $('#word-form');
const $newGame = $('#new-game');
const gameDuration = 60000;
let timeUp = false;
let score = 0;

let wordsGuessed = new Set();

const updateScore = (word) => {
	const wordValue = word.length;
	$message.text(`${word} is worth ${wordValue} points.`);
	score += wordValue;
	$score.text(score);
	wordsGuessed.add(word);
};

const updateUI = (result, word) => {
	if (result === 'ok') {
		// Check to see if word has been already guessed
		if (wordsGuessed.has(word)) {
			console.debug('Duplicate word');
			$message.text(`You already guessed ${word}!`);
			$form.trigger('reset');
			return;
		} else {
			updateScore(word);
		}
	} else if (result === 'not-word') {
		$message.text(`${word} is not a word.`);
	} else {
		$message.text(`${word} is not on the board.`);
	}
};

const handleGuess = async (e) => {
	e.preventDefault();
	console.debug('handleGuess');

	if (timeUp) {
		console.log('Time is up');
		return;
	}

	const word = $('#guess').val();

	// Query API to see if word is ok, not-word, or not-on-board
	const response = await axios.get('/check-word', { params: { word: word } });
	const result = response.data.result;

	updateUI(result, word);

	$form.trigger('reset');
};

const gameOver = async () => {
	console.debug('Game Over');

	timeUp = true;
	$form.hide();
	$message.text(`Game over! Your score is ${score}`);

	// Query API to check/set high score
	const response = await axios.post('/game-over', { score: score });
	$highscore.text(response.data.high_score);
	$newGame.show();
};

const resetGame = () => {
	console.debug('resetGame');
	location.reload();
};

// Start timer and game
setTimeout(gameOver, gameDuration);

$body.on('click', '#guessBtn', handleGuess);

$body.on('click', '#play-again', resetGame);

$score.text(score);
