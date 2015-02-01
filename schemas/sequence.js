/**
 * Created by lijie8 on 2015/1/25.
 */
var mongoose = require('mongoose')

var SequenceSchema = new mongoose.Schema({
    _id				: String, // sequence name
    seq_value		: {type: Number, default: 0}
});

module.exports = SequenceSchema