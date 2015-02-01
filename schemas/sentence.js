/**
 * Created by lijie8 on 2015/2/1.
 */
var mongoose = require('mongoose')

var SentenceSchema = new mongoose.Schema({
    id: String,
    english_content: String,
    chinese_content:String,
    familiarity_level:{type:Number, default:0},
    create_at: Date
})

module.exports = SentenceSchema