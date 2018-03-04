#!/usr/bin/env python

# Dump sqlite db into json file
# Usage:
# $ sqlite2json.py > fatlama.json

import sqlite3
import json

connection = sqlite3.connect('fatlama.sqlite3')
connection.row_factory = sqlite3.Row

# straightforward non-streaming in-memory processing; we know data is small anyway
# it won't parse img_urls properly, but let's skip that for now

cursor = connection.cursor()
cursor.execute('SELECT * from items')
items = cursor.fetchall()
items_dict = { 'items': [ dict(item) for item in items ] }

print(json.dumps(items_dict, indent=4, sort_keys=True))
