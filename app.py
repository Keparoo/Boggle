from flask import Flask, request, render_template, redirect, session, jsonify
# from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "this-is-a-new-secret!"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# app.debug = False # Turn off toolbar
# debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def index():
    """Display game board"""

    board = boggle_game.make_board()
    session['board'] = board

    return render_template('index.html', board=board)

@app.route("/check-word")
def check_word():
    """Check if submitted word is in dictionary"""

    word = request.args["word"]
    board = session["board"]

    result = boggle_game.check_valid_word(board, word)
    # result either 'ok' or 'not-word' or 'not-on-board'

    return jsonify({'result': result})

