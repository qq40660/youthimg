#!/usr/bin/env python
#*_* encoding=utf-8 *_*

from model import Model

class User(Model):
	table = "users"

	def document(self):
		user = {
			"_id": self.get_id(),
			"username": "",
			"password": "",
			"email": ""
		}
		return user


	def get_user(self, user_id):
		params = {"_id": int(user_id)}
		return self.get(params)

	