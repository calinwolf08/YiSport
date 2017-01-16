from flask import Flask
from flask_login import LoginManager
from peewee import *

app = Flask(__name__)
app.config.from_object('config')

db = MySQLDatabase('yisport', user="calin", password="").connect()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

from app import views, models