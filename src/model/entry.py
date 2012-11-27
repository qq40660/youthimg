#!/usr/bin/env python
#*_* encoding=utf-8 *_*

import datetime
from model import Model

class Entry(Model):
	table = "entries"

	def document(self):
		entry = {
  			"_id": self.get_id(),
  			"user_id": "",
  			"title": "",
  			"link": "",
  			"tags": "",
  			"description": "",
  			"source": "",
  			"thumb": "",
  			"published": datetime.datetime.now(),
            "updated": self.timestamp,
            "categories": "",
            "height": 0,
            "width": 0
		}
		return entry


	def save(self, entry):
		return self.insert(entry)

	def get_entry(self, entry_id):
		params = {"_id": entry_id}
		entry = self.db.find_one(self.table, params)
		return entry

	def get_entries_by_category(self, category, offset=0, limit=10):
		params = {"categories": category}
		return self.query(paramters, offset=offset, limit=limit)

	def get_entries_count_by_category(self, category):
		params = {"categores": category}
		return self.get_count(params)