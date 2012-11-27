#!/usr/bin/env python
#*_* encoding=utf-8 *_*


import os
from PIL import Image
import const

def resizeImg(source, image_path, ext):
	ret = {}

	if not os.path.exists(source):
		ret["status"] = False
		ret["msg"] = u"Not found: %s" % source
		return ret

	if ext.upper() == "JPG":
		image_ext = "JPEG"

	img = Image.open(source)
	width = const.THUMB_MAX_WIDTH
	w, h = img.size

	if w < width :
		ret["status"] = False
		ret["msg"] = u"Image size too small"
		return ret

	if w == width:
		height = h
	else:
		height = int(float(width) * float(h) / float(w)) 

	thumb_img = img.resize((width, height), Image.ANTIALIAS)
	thumb_img.save(image_path, image_ext, quality=150)
	ret["status"] = True
	ret["msg"] = u"Ok"
	ret["height"] = height
	ret["width"] = width
	return ret





