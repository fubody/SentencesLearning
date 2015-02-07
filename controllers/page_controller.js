/**
 * Created by lijie8 on 2015/2/1.
 */

module.exports.turnToAdmin = function (req, res) {
    req.body.sentences = JSON.stringify(req.body.sentences);
    req.body.page_info = JSON.stringify(req.body.page_info);
    res.render('admin', req.body);
}

module.exports.turn_to_practice = function (req, res) {
    req.body.sentences = JSON.stringify(req.body.sentences);
    res.render('practice', req.body);
}