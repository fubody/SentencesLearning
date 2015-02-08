/**
 * Created by lijie8 on 2015/2/1.
 */

var status_code = {
    correct:1,
    wrong:-1,
    none:0
}

var current_index = 0;
var all_sentences;
var sentences_status = [];
var correct_number = 0;
var wrong_number = 0;
var isShowEnglish = false;
var isFinished = false;

$(document).ready(function() {
    var data_span = $('#service_data');
    if (data_span) {
        var sentences = data_span.text();
        eval('all_sentences = ' + sentences);
        if (all_sentences && all_sentences.length > 0) {
            initSentencesStatus();
            render_current_sentence();
        } else {
            render_finished();
        }
    }
})

function initSentencesStatus() {
    for (var i = 0; i < all_sentences.length; i++) {
        sentences_status[i] = status_code.none;
    }
}

function renderProgressBar() {
    $('#progress_proporation').text(correct_number + '/' + all_sentences.length);
    if (all_sentences && all_sentences.length > 0) {
        $('#progress_correct').width(getPercent(correct_number, all_sentences.length) + '%');
        $('#progress_wrong').width(getPercent(wrong_number, all_sentences.length) + '%');
    } else {
        $('#progress_correct').width('100%');
        $('#progress_wrong').width('0');
    };
}

function nextSentence() {
    if(!isShowEnglish) {
        return;
    }
    update_sentence_status(function (err) {
        if(err) {
            alert(err);
        } else {
            var result = getNextSentence();
            if (result) {
                isShowEnglish = false;
                render_current_sentence();
            } else {
                render_finished();
            }
        }
    });
}

function getNextSentence() {
    if (all_sentences && all_sentences.length > 0 && correct_number < all_sentences.length) {
        current_index++;
        current_index = current_index % all_sentences.length;
        while(sentences_status[current_index] == status_code.correct) {
            current_index++;
            current_index = current_index % all_sentences.length;
        }
        return true;
    } else {
        return false;
    }
}

function update_sentence_status(callback) {
    $.ajax({
        type: 'POST',
        url:  '/practice/finished',
        data: all_sentences[current_index],
        dataType: 'json'
    }).done(function (data) {
        callback();
    }).fail(function () {
        callback('连接网络失败');
    });
}

function render_current_sentence() {
    renderProgressBar();
    var sentence = all_sentences[current_index];
    if (sentence) {
        var sentence_html_info =
            '<div class="panel panel-info"><div class="panel-heading">练习</div>' +
            '<div class="panel-body"><h4>' + sentence.chinese_content + '</h4>';
        if (isShowEnglish) {
            sentence_html_info += '<h4>' + sentence.english_content + '</h4>'
        } else {
            sentence_html_info += '<a type="button" onclick="sentenceRight()" class="btn btn-default">准确复述（1）</a>' +
            '<a type="button" onclick="sentenceWrong()" class="btn btn-default">复述错误（2）</a>';
        }
        sentence_html_info += '<div><a class="btn btn-info btn-lg pull-right" onclick="nextSentence()"><span class="glyphicon glyphicon-forward">下一个（D）</span></a></div></div></div>';
        $('#sentence_body').html(sentence_html_info);
    } else {
        render_finished();
    }
}

function render_finished() {
    renderProgressBar();
    var sentence_html_info =
        '<div class="panel panel-info"><div class="panel-heading"><h4>练习</h4></div>' +
        '<div class="panel-body" align="center"><h3>已完成当天学习</h3>' +
        '<div><a class="btn btn-info btn-lg pull-right"><span class="glyphicon glyphicon-forward">返回（B）</span></a></div></div></div>';
    $('#sentence_body').html(sentence_html_info);
    isFinished = true;
}

document.onkeypress=function(event){
    if (event.keyCode == 49) {
        //'1'
        if(correct_number < all_sentences.length && !isShowEnglish) {
            sentenceRight();
        }
    } else if (event.keyCode == 50) {
        //'2'
        if(correct_number < all_sentences.length && !isShowEnglish) {
            sentenceWrong();
        }
    } else if (event.keyCode == 68 || event.keyCode == 100) {
        //'D'
        nextSentence();
    } else if (event.keyCode == 66 || event.keyCode == 98) {
        //'B'
        if(correct_number == all_sentences.length) {
            backToIndex();
        }
    }
}

function sentenceRight() {
    if (sentences_status[current_index] == status_code.wrong) {
        wrong_number--;
    }
    sentences_status[current_index] = status_code.correct;
    correct_number++;
    isShowEnglish = true;
    all_sentences[current_index].familiarity_level++;
    render_current_sentence();
}

function sentenceWrong() {
    if (sentences_status[current_index] != status_code.wrong) {
        sentences_status[current_index] = status_code.wrong;
        wrong_number++;
    }
    isShowEnglish = true;
    render_current_sentence();
}

function backToIndex() {
    document.location.href='/';
}