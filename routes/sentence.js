/**
 * Created by lijie8 on 2015/2/1.
 */
var express = require('express');
var Sentence = require('../controllers/sentence')
var router = express.Router();

router.get('/', function (req, res) {
    res.render('sentence',{})
})

router.post('/new', Sentence.createSentence)

module.exports = router;