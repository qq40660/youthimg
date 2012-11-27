#!/usr/bin/env python
#*_* encoding=utf-8 *_*

import os
import simplejson as json
from flask import Flask, flash, redirect, render_template, request, session, url_for
from flaskext.uploads import UploadSet, IMAGES
from flaskext.uploads import configure_uploads
from model.entry import Entry
from model.category import Category
from model.user import User
from util import *
from image import *
import const

ROOT_PATH = os.path.dirname(__file__)
ABS_PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

DEBUG = True
SECRET_KEY = 'ZL=_K8RJ:e{+6WwdlnX~tR6a|`BoYBi>'
UPLOADS_DEFAULT_DEST = ABS_PROJECT_ROOT + "/static"
UPLOADS_DEFAULT_URL = 'http://127.0.0.1:5000/static'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('YOUTHING_SETTINGS', silent=True)

uploads = UploadSet('uploads', IMAGES)
configure_uploads(app, uploads)

@app.route("/")
def index():

	entries = Entry().query(None, 0, const.PAGE_SIZE * 2)
	categories = Category().query(None, 0, const.MAX_CATEGORY_SIZE)

	return render_template("index.html", entries=entries, 
		categories=categories, page=2,  cat="")

@app.route("/login", methods=["GET", "POST"])
def login():
	error = None
	if request.method == "POST":
		username = request.form["username"]
		password = request.form["password"]

		if username and password:
			params = {"username": username, "password": sha1(password)}
			user = User().get(params)
			if user:
				session["username"] = username
				return redirect(url_for("index"))
			else:
				error = u"帐号密码不匹配"
		else:
			error = u"请输入用户名和密码"
	return render_template("login.html", error=error)

@app.route("/logout")
def logout():
	session.pop('username', None)
	return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
	error = None
	if request.method == "POST":
		username = request.form["username"]
		password = request.form["password"]
		email = request.form["email"]

		if username and password and email:
			params = {"username": username, "password": sha1(password), "email": email}
			print params
			user = User().insert(params)
			print user
			if user:
				return redirect(url_for("login"))
			else:
				error = u"你杯具了，注册失败"
		else:
			error = u"亲，请认真填写注册信息哦，可不带这么偷懒的"
	return render_template("register.html", error=error)

@app.route("/image/update", methods=["GET", "POST"])
def update():

	result = {}
	
	page = int(request.form.get("page", 1))
	category = request.form.get("category", None)

	next  = page + 1

	offset = (next - 1) * const.PAGE_SIZE
	entries = Entry().query(None, offset, const.PAGE_SIZE)

	data = []
	for entry in entries:
		d = dict(entry)
		data.append({"_id": d["_id"], "title": d["title"], "thumb": d["thumb"],
			"width": d["width"], "height": d["height"]})

	result["data"] = data
	result["page"] = next
	result["cat"] = ""

	return json.dumps(result)


@app.route("/image/upload", methods=["GET", "POST"])
def upload():
	categories = Category().query(None, 0, const.MAX_CATEGORY_SIZE)
	if request.method == 'POST':
		file_storage = request.files['upload_img']
		file_name = file_storage.filename
		
		if file_name:
			ext = file_name.rsplit('.', 1)[1]
			date_dir = get_date_dir()
			uuid = get_uuid()
			name = '%s_source.%s' % (uuid, ext)
			source = uploads.save(file_storage, folder=date_dir, name=name)

			thumb_name = '%s_thumb.%s' % (uuid, ext)
			thumb = os.path.join(date_dir, thumb_name).replace('\\','/')
			thumb_path = os.path.join(app.config["UPLOADS_DEFAULT_DEST"], "uploads/"+thumb)
			
			source_path = os.path.join(app.config["UPLOADS_DEFAULT_DEST"], "uploads/"+source)
			ret = resizeImg(source_path, thumb_path, ext)

			if 	ret["status"]:
				height = ret.get("height", 0)
				width = ret.get("width", 0)

	        	entry = Entry()
	        	document = entry.document()
	        	document.update({
	        		"title": request.form['title'], 
	        		"link": request.form['link'], 
	        		"categories":request.form['categories'],
	        		"tags": request.form['tags'], 
	        		"description": request.form['description'], 
	        		"source": source, 
	        		"thumb": thumb,
	        		"width": width,
	        		"height": height
	        	})

	        	entry.insert(document)

	        	flash(u"恭喜你，上传图片成功了")
	        	return redirect(url_for("upload"))
	        else:
	        	flash(ret["msg"])
        else:
        	flash(u"亲，必须选择一张图片的哦")

	return render_template("upload.html", categories=categories)


def init_db():
	category = Category()
	category.save()


if __name__ == '__main__':
    app.run()