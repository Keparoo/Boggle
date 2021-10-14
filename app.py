from flask import Flask, request, render_template, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "this-is-a-new-secret!"

boggle_game = Boggle()

@app.route("/")
def index():
    """Display game board"""

    board = boggle_game.make_board()
    session['board'] = board
    high_score = session.get('high_score', 0)
    num_plays = session.get('num_plays', 0)

    return render_template('index.html', board=board, high_score=high_score, num_plays=num_plays)

@app.route("/check-word")
def check_word():
    """Check if submitted word is in dictionary"""

    word = request.args["word"]
    board = session["board"]

    result = boggle_game.check_valid_word(board, word)

    return jsonify({'result': result})

@app.route("/game-over", methods=['POST'])
def set_score():
    """Set new highscore and increment number of plays"""

    score = request.json['score']
    high_score = session.get('high_score', 0)
    num_plays = session.get('num_plays', 0)

    session['high_score'] = max(score, high_score)
    session['num_plays'] = num_plays + 1

    return jsonify({"high_score": session['high_score'], "num_plays": session['num_plays']})