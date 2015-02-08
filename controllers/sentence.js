/**
 * Created by lijie8 on 2015/2/1.
 */

var Sentence = require('../models/sentence')
var Sequence = require('./sequence')
var Config = require('../utils/config')
var _ = require('underscore')

module.exports.createSentence = function (req, res) {
    var sentenceObj = req.body

    if (sentenceObj) {
        var _sentence = get_sentence_from_req(req)
        Sequence.next_seq_id('sentence', function (err, seq_value) {
            if (err) {
                console.log(err)
            } else {
                _sentence.id = seq_value
                _sentence.save(function (err, sentence) {
                    if (err) {
                        console.log(err)
                    }
                    res.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
                    res.write(
                        JSON.stringify({result: 'success',sentence:sentence}));
                    res.end();
                })
            }
        })
    }
}

function get_sentence_from_req(req) {
    return new Sentence({
        english_content: req.body.english_content,
        chinese_content: req.body.chinese_content,
        familiarity_level: 1,
        create_at: Date()
    });
}

module.exports.fetchAllSentences = function (req, res, next) {
    Sentence.find().sort('-create_at').exec(function (err, sentences) {
        if (err) {
            console.log(err);
        } else {
            req.body.sentences = sentences;
            next();
        }
    })
}

function getReviewDatesInfo(isTotal) {
    var date_now = Date.now();
    var review_days = Config.time_constants.review_days;
    var review_dates = [];
    for (var i = 0; i < review_days.length; i++) {
        var date = new Date(date_now - review_days[i] * Config.time_constants.day);
        var date_floor = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var date_ceiling = new Date(date_floor.getTime() + Config.time_constants.day);
        if (isTotal) {
            review_dates[i] = {
                create_at: {'$gte': date_floor, '$lt': date_ceiling}
            }
        } else {
            review_dates[i] = {
                create_at: {'$gte': date_floor, '$lt': date_ceiling},
                familiarity_level:{'$lt': i + 2}
            }
        }
    }
    return review_dates;
}

module.exports.getTodayPracticeNum = function (req, res, next) {
    var review_dates_practice = getReviewDatesInfo(false);
    var index = 0;

    var practice_num = 0;
    var query_practice_num = function () {
        Sentence.count(review_dates_practice[index]).exec(function (err, count) {
            if (err) {

            } else {
                practice_num += count;
            }
            index++;
            if(index < review_dates_practice.length) {
                query_practice_num();
            } else {
                req.body.practice_num = practice_num;
                next();
            }
        });
    };
    query_practice_num();
}

module.exports.getTodayTotalNum = function (req, res, next) {
    var review_dates_total = getReviewDatesInfo(true);
    var index = 0;

    var total_num = 0;
    var query_total_num = function () {
        Sentence.count(review_dates_total[index]).exec(function (err, count) {
            if (err) {

            } else {
                total_num += count;
            }
            index++;
            if(index < review_dates_total.length) {
                query_total_num();
            } else {
                req.body.total_num = total_num;
                next();
            }
        });
    };
    query_total_num();
}

module.exports.fetchTodaySentences = function(req, res, next) {
    var review_dates = getReviewDatesInfo(false);
    var index = 0;

    var today_sentences = [];
    var query_sentences = function () {
        Sentence.find(review_dates[index]).sort('-create_at').exec(function (err, sentences) {
            if (sentences && sentences.length > 0) {
                today_sentences = today_sentences.concat(sentences);
            }
            index++;
            if(index < review_dates.length) {
                query_sentences();
            } else {
                req.body.sentences = today_sentences;
                next();
            }
        });
    };
    query_sentences();
}

module.exports.fetchPageCount = function (req, res, next) {
    Sentence.count(function (err, count) {
        if (err){
        } else {
            req.body.page_info = {page_count:Math.ceil(count/Config.page_size)};
            next()
        }
    })
}

module.exports.fetchPartSentences = function (req, res, next) {
    var p = req.query['p'];
    var page;
    if (p && p >= 1) {
        page = p;
    } else {
        page = 1;
    }

    var page_size = Config.page_size;
    Sentence.find().sort('-create_at').limit(page_size).skip(page_size*(page-1)).exec(function(err, sentences){
        if(err){
            console.log(err)
        }else{
            req.body.sentences = sentences;
            req.body.page_info.page_index = page
            next()
        }
    });
}

module.exports.practice_finished = function(req, res) {
    var sentence = req.body;
    console.log(sentence)
    if(sentence) {
        var id = sentence.id;
        Sentence.findOne({id:id}).exec(function (err, _sentence) {
            _sentence.familiarity_level = sentence.familiarity_level;
            _sentence.save(function (err, data) {
                if (err) {

                } else {
                    res.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
                    res.write(
                        JSON.stringify({result: 'success'}));
                    res.end();
                }
            });
        });
    }
}