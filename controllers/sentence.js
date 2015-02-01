/**
 * Created by lijie8 on 2015/2/1.
 */

var Sentence = require('../models/sentence')
var Sequence = require('./sequence')

module.exports.createSentence = function (req, res) {
    var sentenceObj = req.body

    if (sentenceObj) {
        var _sentence = get_sentence_from_req(req)
        Sequence.next_seq_id('sentence', function (err, seq_value) {
            if (err) {
                console.log(err)
            } else {
                _sentence.id = seq_value
                _sentence.save(function (sentence, err) {
                    if (err) {
                        console.log(err)
                    }
                    res.redirect('/')
                })
            }
        })
    }
}

function get_sentence_from_req(req) {
    return new Sentence({
        english_content: req.body.english_content,
        chinese_content: req.body.chinese_content,
        familiarity_level: 0,
        create_at: Date()
    });
}

module.exports.fetchAllSentences = function (req, res, next) {
    Sentence.find().exec(function (err, sentences) {
        if (err) {
            console.log(err)
        } else {
            req.body.sentences = sentences
            next()
        }
    })
}