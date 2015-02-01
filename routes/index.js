/**
 * Created by lijie8 on 2015/2/1.
 */
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('index',{})
})

module.exports = router;