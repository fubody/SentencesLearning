/**
 * Created by lijie8 on 2015/2/1.
 */
var current_index = 0;
var all_sentences;

$(document).ready(function() {
    var data_span = $('#service_data');
    if (data_span) {
        var sentences = data_span.text()
        eval('sentences = ' + sentences)
        if (sentences && sentences.length > 0) {
            all_sentences = sentences;
            render_current_sentence(sentences[current_index]);
        } else {
            render_finished();
        }
    }
})

function render_current_sentence(sentence) {
    if (sentence) {
        var sentence_html_info =
            '<div class="panel panel-info"><div class="panel-heading"><h4>练习</h4></div>' +
            '<div class="panel-body"><h4>' + sentence.chinese_content + '</h4>' +
            '<a type="button" href="./practice" class="btn btn-default">1.准确复述</a>' +
            '<a type="button" href="./practice" class="btn btn-default">2.复述错误</a>' +
            '<div><a class="btn btn-info btn-lg pull-right"><span class="glyphicon glyphicon-forward">下一个</span></a></div></div></div>';
        $('#sentence_body').html(sentence_html_info);
    }
}

function render_finished() {
    var sentence_html_info =
        '<div class="panel panel-info"><div class="panel-heading"><h4>练习</h4></div>' +
        '<div class="panel-body" align="center"><h3>已完成当天学习</h3>' +
        '<div><a class="btn btn-info btn-lg pull-right"><span class="glyphicon glyphicon-forward">返回</span></a></div></div></div>';
    $('#sentence_body').html(sentence_html_info);
}

//.panel.panel-info
//    .panel-heading
//h4 练习
//    .panel-body
//h4 这个是汉语句子。
//a.btn.btn-default(type='button',href='./practice') 1.准确复述
//a.btn.btn-default(type='button',href='./practice') 2.复述错误
//div
//a.btn.btn-info.btn-lg.pull-right
//span.glyphicon.glyphicon-forward 下一个