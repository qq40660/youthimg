#!/usr/bin/env python
#-*- coding: utf-8 -*-

from model import Model

class Category(Model):
    table = "categories"

    def save(self):
        cates = (u'旅行', u'艺术', u'建筑', u'人物', u'摄影', u'电影/音乐', u'生活', 
                 u'汽车', u'DIY', u'创意/设计', u'萌宠', u'美食', u'家居', u'手绘/插画',
                 u'美女', u'儿童', u'自然', u'健康', u'服饰/街拍', u'婚礼', u'体育',
                 u'科技', u'海报', u'产品', u'3C数码', u'趣味', u'妆发', u'手工/玩物',
                 u'男人', u'动漫')
        for cate in cates:
            item = {'_id': self.get_id(), 'name': cate}
            self.insert(item)
