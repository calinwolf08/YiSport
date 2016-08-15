from peewee import *
import datetime
# from pprint import pprint

db = MySQLDatabase('YiSportTKD', user="calin", password="")

"""
create slideshow table with fk to images
"""

class User(Model):
    user_id = PrimaryKeyField()
    email = CharField(max_length='100')
    password = CharField(max_length='100')

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.user_id)

    def __repr__(self):
        return str(self.user_id) + ': ' + self.email + ': ' + self.password

    class Meta:
        database = db

class Image(Model):
    image = PrimaryKeyField()
    path = CharField(max_length = '150')
    type = CharField(max_length= '50')          #logo or post so far

    class Meta:
        database = db

class BlogPost(Model):
    blog_post_id = PrimaryKeyField()
    title = CharField(max_length='100')
    text = CharField(max_length = '1500')
    created_by = CharField(max_length='50')
    date_created = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = db

class PagePost(Model):
    post_id = PrimaryKeyField()
    page = CharField(max_length='100')              #identify which page
    title = CharField(max_length='150')             #identify what field - welcome, news, etc
    tag = CharField(max_length='50')
    text = CharField(max_length='1500', null=True)  #will be path if tag is image
    author = CharField(max_length='100', null=True)
    active = BooleanField(default=False)            #whether this is current active post
    date_created = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = db

if __name__ == '__main__':
    db.connect()
    db.drop_tables([Image], safe = True)
    db.create_tables([Image], safe = True)
    """
    PagePost(page="index", title="welcome", tag="text",
             text="welcome to yisport tkd welcome to yisport tkd welcome to yisport tkd",
             active="true").save()
    PagePost(page="index", title="welcome", tag="image",
             text = "static/images/post/kick.jpg",
             active = "true").save()

    PagePost(page="index", title="values", tag="text",
             text="being good and stuff", path="static/images/post/bow.jpg",
             active="true").save()
    PagePost(page="index", title="values", tag="image",
             text="static/images/post/bow.jpg",
             active="true").save()

    PagePost(page="index", title="news", tag="text",
             text="news, dates, etc",
             active="true").save()
    PagePost(page="index", title="news", tag="image",
             text="static/images/post/trophy.jpg",
             active="true").save()

    PagePost(page="index", title="testemonial", tag="testemonial",
             text="While I’m sure there are many caring coaches and instructors in Seattle, Yi Sport TKD stood out to my wife and I after watching our first class, and seeing the high level of instruction.  After seeing the Yi Sport team compete at a local Seattle Tae Kwon Do tournament, we haven’t looked back since and have no doubt about the choice we made for our kids.",
             active="true", author="Graeme Gibson").save()
    PagePost(page="index", title="testemonial", tag="testemonial",
             text="My son Dante has been with Yi Sports for over two years. He loves being a part of the team. I love it because Coach Lee’s practice focuses on fitness, respect and good sportsmanship. Not only will my son do well at Taekwondo he will excel at any sport he does because of the strength and fitness that Yi Sports is building in him.",
             active="true", author="Parvana Saladino").save()
    PagePost(page="index", title="testemonial", tag="testemonial",
             text="Definitively the best TKD school in Washington. Not just for Sport TKD but for conditioning of the mind and body for kids. One of my favorite aspects of the training are the life lessons that are taught at the end of every class. Respect, confidence, motivation, and self belief are the core teachings at Yi Sport TKD.",
             active="true", author="Gene Shin").save()"""

    Image(path = "static/images/yisporttkd_logo1.jpg", type="logo").save()
    Image(path="static/images/post/bow.jpg", type="post").save()
    Image(path="static/images/post/kick.jpg", type="post").save()
    Image(path="static/images/post/pose.jpg", type="post").save()
    Image(path="static/images/post/trophy.jpg", type="post").save()
    Image(path="static/images/post/womens_team.jpg", type="post").save()