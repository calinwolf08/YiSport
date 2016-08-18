from flask import render_template, request, jsonify, json
from flask import redirect, url_for, g, flash, session
from flask_login import current_user, login_user, logout_user
from flask_login import *
from app import app, models, login_manager
from .forms import LoginForm
from playhouse.shortcuts import model_to_dict
from werkzeug import secure_filename
from peewee import JOIN
import os

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

@app.route('/serivce/getPostsByPage', methods=['GET', 'POST'])
def getPostsByTag():
    posts = []

    page = request.get_json().get('page')

    for post in  models.PagePost.select().where(models.PagePost.page==page).where(models.PagePost.active == True):
        posts.append(model_to_dict(post))

    return json.dumps(posts)

@app.route('/serivce/fetchPostsByTitleTag', methods=['GET', 'POST'])
def fetchPostsByTitle():
    posts = []

    title = request.get_json().get('title')
    tag = request.get_json().get('tag')

    for post in models.PagePost.select().where(models.PagePost.title == title).where(models.PagePost.tag == tag):
        posts.append(model_to_dict(post))

    return json.dumps(posts)

@app.route('/serivce/fetchImages', methods=['GET', 'POST'])
def fetchImages():
    images = []

    activePath = request.get_json().get('active')

    for img in models.Image.select().where(models.Image.path != activePath):
        temp = {'text': img.path}
        images.append(temp)

    return json.dumps(images)

@app.route('/serivce/saveNewImage', methods=['GET', 'POST'])
def saveNewImages():
    file = request.files['file']

    newPath = os.path.join('static', 'images', 'post', secure_filename(file.filename))
    dir = os.path.dirname(os.path.abspath(__file__))

    path = os.path.join(dir, newPath)

    file.save(path)

    temp = models.Image(path=newPath, type='post')
    temp.save()

    return json.dumps({'path' : newPath})

@app.route('/serivce/removeImages', methods=['POST'])
def removeImages():
    posts = request.get_json().get('posts')

    for post in posts:
        dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(dir, post['text'])

        os.remove(path)

        models.Image.delete().where(models.Image.path == post['text']).execute()

    return jsonify(success=True)

@app.route('/serivce/fetchSlideshowImages', methods=['GET', 'POST'])
def fetchSlideshowImages():

    get_active = request.get_json().get('getActive')
    images = []

    #only get active slideshow images
    if get_active:
        query = models.Image.select(models.Image.path, models.SlideShowImage.active) \
            .join(models.SlideShowImage) \
            .where(models.Image.image == models.SlideShowImage.image and models.SlideShowImage.active ==  True).naive()
    #get all slideshow images
    else:
        query = models.Image.select(models.Image.path, models.SlideShowImage.active) \
            .join(models.SlideShowImage).where(models.Image.image == models.SlideShowImage.image).naive()

    for img in query:
        images.append({'path' : img.path, 'active' : img.active})

    return json.dumps(images)

@app.route('/serivce/saveUpdatePosts', methods=['POST'])
def saveUpdatePosts():
    posts = request.get_json().get('posts')

    for post in posts:
        temp = models.PagePost(page=post['page'], title=post['title'], tag=post['tag'],
                               text=post['text'], active=post['active'])

        if 'post_id' in post.keys():
            temp.post_id = post['post_id']

        if 'author' in post.keys():
            temp.author = post['author']

        temp.save()

    return json.dumps({})

@app.route('/serivce/updateSlideshowImages', methods=['GET', 'POST'])
def updateSlideshowImages():
    images = request.get_json().get('images')

    for img in images:
        if 'isNew' in img.keys():
            curImage = models.Image.select().where(models.Image.path == img['path']).get()
            models.SlideShowImage(image_id=curImage.image, active=True).save()
        else:
            curSsImage = models.SlideShowImage.select() \
                .join(models.Image) \
                .where(models.Image.path == img['path']).get()
            curSsImage.active = img['active']
            curSsImage.save()

    return jsonify(success=True)

@app.route('/serivce/fetchAvailableImages', methods=['GET', 'POST'])
def fetchAvailableImages():
    images = []

    query = models.Image.select().join(models.SlideShowImage, JOIN.LEFT_OUTER).where(models.SlideShowImage.image == None)

    for img in query:
        temp = {'text': img.path}
        images.append(temp)

    return json.dumps(images)

@app.route('/directives/editField.html', methods=['GET', 'POST'])
def editField():
    return render_template('directives/editField.html')