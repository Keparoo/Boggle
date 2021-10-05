from flask import Flask, request, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "this-is-a-new-secret!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = False # Turn off toolbar

debug = DebugToolbarExtension(app)

app.route('/')
def index():
    pass