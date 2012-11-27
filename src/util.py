#!/usr/bin/env python
#*_* encoding=utf-8 *_*

import hashlib
import binascii
import uuid
import time

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('username'):
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def get_date_dir():
    year, month, day = \
        time.strftime('%Y-%m-%d', time.localtime(time.time())).split("-")
    path = "%s/%s/%s" % (year, month, day)
    return path

def sha1(basestring):
    hash = hashlib.sha1()
    hash.update(basestring)
    return hash.hexdigest()

def get_uuid():
    return binascii.b2a_hex(uuid.uuid4().bytes)