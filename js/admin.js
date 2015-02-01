/**
 * Created by lijie8 on 2015/2/1.
 */
$(document).ready(function() {
    var data_span = $('#service_data');
    if (data_span) {
        var sentences = data_span.text()
        eval('sentences = ' + sentences)
        if (sentences && sentences.length > 0) {
            var sentences_html_info = '';
            for (var i = 0; i < sentences.length; i++) {
                var sentence = sentences[i];
                sentences_html_info +=
                    '<div class="panel panel-info"><div class="panel-heading">' +
                    '<span>' + date_formater(sentence.create_at) + '</span>' +
                    '<div class="pull-right progress" style="width: 150px">' +
                    '<div class="progress-bar" role="progressbar" style="width: ' +
                    getPercent(sentence.familiarity_level,7) + '%"></div></div></div>' +
                    '<div class="panel-body"><h4>' + sentence.english_content +
                    '</h4><h4>' + sentence.chinese_content + '</h4></div></div>';
            }
            $('#admin_content').html(sentences_html_info)
        } else {
            var sentences_html_info = '<div class="panel-body"><h4>暂无数据</h4></div>';
            $('#admin_content').html(sentences_html_info)
        }
    }

})

function getPercent(value, total) {
    value = parseFloat(value)
    total = parseFloat(total)
    if (isNaN(value) || isNaN(total)) {
        return 0;
    }
    return total <= 0 ? 0 : (Math.round(value / total * 10000) / 100.00);
}

//    .panel.panel-info
//    .panel-heading
//span #{sentence.create_at}
//    .pull-right.progress(style='width:150px')
//    .progress-bar(role='progressbar' style='width:20%')
//.panel-body
//h4 #{sentence.english_content}
//h4 #{sentence.chinese_content}