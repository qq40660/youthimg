#!/usr/bin/env python
#*_* encoding=utf-8 *_*

import pymongo

from pymongo.son_manipulator import AutoReference, NamespaceInjector

HOST = "127.0.0.1"
PORT = 27017
MAX_POOL_SIZE = 2

class Database(object):
	def __init__(self):
		self.conn = pymongo.Connection(HOST, PORT, MAX_POOL_SIZE)
		self.db = self.conn["youthimg"]
		self.db.add_son_manipulator(AutoReference(self.db))

	def insert(self, table, documents):
		return self.db[table].insert(documents)

	def query(self, table, params, sort, offset, limit, fields=None):
		cursor = self.db[table].find(params, fields).skip(offset).limit(limit)
		cursor.sort(sort, pymongo.DESCENDING)
		return cursor

	def get_count(slef, table, params):
		return self.db[table].find(params).count()

	def get_id(self, table):
		value = self.db["ids"].find_and_modify(
 				{"name": table}, {"$inc": {"value": 1}}, new=True, upsert=True)
		return value["value"]

	def find_one(self, table, params):
		return self.db[table].find_one(params)

	def update(self, table, params, update, safe=True):
		return self.db[table].update(params, update, safe)

	def dereference(self, dbref):
		return self.db.dereference(dbref)

	def remove(self, table, params):
		self.db[table].remove(params)

