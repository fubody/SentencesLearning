/**
 * Created by lijie8 on 2015/2/1.
 */
var mongoose = require('mongoose')
var SentenceSchema = require('../schemas/sentence')

Sentence = mongoose.model('sentence', SentenceSchema)

module.exports = Sentence