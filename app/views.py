from flask import render_template, request
from flask import redirect, url_for, g, flash, session
from flask_login import current_user, login_user, logout_user
from flask_login import *
from app import app, models, login_manager
from .forms import LoginForm

@login_manager.user_loader
def load_user(id):
    return models.User.get(models.User.user_id == int(id))

@app.before_request
def before_request():
    g.user = current_user

def try_login(email, password):
    try:
        user = models.User.get(models.User.email == email, models.User.password == password)
        if email is None or email == '' or password is None or password == '':
            flash('Invalid login. Please try again.')
            return False

        remember_me = False

        if 'remember_me' in session:
            remember_me = session['remember_me']
            session.pop('remember_me', None)

        login_user(user, remember = 'remember_me')
        return True
    except models.User.DoesNotExist:
        return False

@app.route('/')
@app.route('/index')
def index():
    #image_db = models.Image.select()
    #images = []

    #for i in image_db:
       # images.append(i.path)

    #print(images)

    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()

    if form.validate_on_submit():
        session['remember_me'] = form.remember_me
        flash('Login requested for ' + form.email.data)
        try_login(form.email.data, form.password.data)
        return redirect(request.args.get('next') or url_for('index'))

    return render_template('login.html', form=form, title='Sign In')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
