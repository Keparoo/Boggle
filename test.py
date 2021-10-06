from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_boggle_board(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Boggle Game</h1>', html)
            self.assertIn('<table>', html)

