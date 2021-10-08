from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    def setUp (self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_boggle_board(self):
        """Test if boggle board is displayed"""

        with self.client:
            resp = self.client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            # self.assertIn('board', session)
            self.assertIn('<table>', html)
            self.assertIn('Enter a guess:', html)
            self.assertIn('<h1>Boggle Game</h1>', html)
            self.assertIn('<table>', html)

    def test_valid_word(self):
        """Set up board and test if valid word"""

        with self.client as client:
            with client.session_transaction() as s:
                s['board'] = [["F", "U", "N", "N", "Y"],
                              ["F", "U", "N", "N", "Y"],
                              ["F", "U", "N", "N", "Y"],
                              ["F", "U", "N", "N", "Y"],
                              ["F", "U", "N", "N", "Y"]]
        resp = self.client.get('/check-word?word=funny')
        self.assertEqual(resp.json['result'], 'ok')

    def test_invalid_word(self):
        """Test for a word that is not in the dictionary"""

        self.client.get('/')
        resp = self.client.get('/check-word?word=xyz')
        self.assertEqual(resp.json['result'], 'not-word')

    def test_word_not_on_board(self):
        """Check for word not being on the board"""

        self.client.get('/')
        resp = self.client.get('/check-word?word=hello')
        self.assertEqual(resp.json['result'], 'not-on-board')