/**
 * Created by lijie8 on 2015/2/1.
 */
var express = require('express');
var Sentence = require('../controllers/sentence')
var router = express.Router();

router.post('/new', Sentence.createSentence)
//router.get('/test', Sentence.fetchTodaySentences)

module.exports = router;