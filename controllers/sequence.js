/**
 * Created by lijie8 on 2015/1/25.
 */
var Sequence = require('../models/sequence')

module.exports.next_seq_id = function(_seq_name, callback) {
    //console.log('callback = '+callback);
    _seq_name = _seq_name.toLowerCase();

    Sequence.collection.findAndModify({_id: _seq_name}, [], {$inc: {seq_value: 1}}, {"new":true, upsert:true},
        function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.seq_value);
            }
        }
    );
}