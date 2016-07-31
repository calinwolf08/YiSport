from peewee import *
import datetime
# from pprint import pprint

db = MySQLDatabase('YiSportTKD', user="calin", password="")

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
    type = CharField(max_length= '50')

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

if __name__ == '__main__':
    db.connect()
    db.drop_tables([BlogPost, User], safe = True)
    db.create_tables([BlogPost, User], safe = True)


    """Image(path = "static/images/yisporttkd_logo1.jpg", type="logo").save()
    Image(path="static/images/slideshow/bow.jpg", type="slideshow").save()
    Image(path="static/images/slideshow/kick.jpg", type="slideshow").save()
    Image(path="static/images/slideshow/pose.jpg", type="slideshow").save()
    Image(path="static/images/slideshow/trophy.jpg", type="slideshow").save()
    Image(path="static/images/slideshow/womens_team.jpg", type="slideshow").save()"""