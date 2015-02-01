/**
 * Created by lijie8 on 2015/2/1.
 */
var express = require('express');
var Sentence = require('../controllers/sentence')
var PageController = require('../controllers/page_controller')

var router = express.Router();

router.get('/', Sentence.fetchAllSentences, PageController.turnToAdmin)

module.exports = router;