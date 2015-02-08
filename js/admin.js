/**
 * Created by lijie8 on 2015/2/1.
 */
var currentSentences = [];

$(document).ready(function() {
    var data_span = $('#service_data');
    if (data_span) {
        var sentences = data_span.text()
        eval('currentSentences = ' + sentences)
    }
    refreshSentences();
})

function refreshSentences() {
    if (currentSentences && currentSentences.length > 0) {
        var sentences_html_info = '';
        for (var i = 0; i < currentSentences.length; i++) {
            var sentence = currentSentences[i];
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

    var page_info_span = $('#page_info');
    if (page_info_span) {
        var page_info = page_info_span.text()
        eval('page_info = ' + page_info)
    }
    var page_index = parseInt(page_info.page_index);
    var page_count = parseInt(page_info.page_count);
    var navigator_html = '';
    if (page_count && page_index) {
        //设置分页显示的下标数字
        var start = page_index - 4 > 0 ? page_index -4 : 1;
        var end = page_index + 4 < page_count ? page_index + 4 : page_count;
        if (page_index > 1) {
            navigator_html += '<li><a href="/admin?p=' + (page_index - 1) + '">&laquo;</a></li>';
        } else {
            navigator_html += '<li class="disabled"><a>&laquo;</a></li>';
        }
        for (var i = start; i <= end; i++) {
            if (i == page_index) {
                navigator_html += '<li class="active" ><a href="#">' + i + '</a></li>';
            } else {
                navigator_html += '<li><a href="/admin?p=' + i + '">' + i + '</a></li>';
            }
        }
        if (page_index < page_count) {
            navigator_html += '<li><a href="/admin?p=' + (page_index + 1) + '">&raquo;</a></li>';
        } else {
            navigator_html += '<li class="disabled"><a>&raquo;</a></li>';
        }
    } else {
        navigator_html += '<li class="active"><a href="#">1</a></li>';
        navigator_html += '<li class="disabled"><a>&raquo;</a></li>';
    }
    $('#page_navigation').html(navigator_html)
}

function resetModal() {
    $('#english_content').val('');
    $('#chinese_content').val('');
    $('#add_button').button('reset');
}

document.onkeypress=function(event){
    if (event.keyCode == 78 || event.keyCode == 110) {
        //'N'
        addSentence();
    } else if (event.keyCode == 66 || event.keyCode == 98) {
        //'N'
        backToIndex();
    }
}

function addSentence() {
    $('#add_sentence').modal()
}

function backToIndex() {
    document.location.href='/';
}

function checkSentenceSubmit() {
    var english_text = $('#english_content').val()
    var chinese_text = $('#chinese_content').val()
    if (!english_text || english_text.trim().length == 0) {
        alert('英文句子为空')
        return
    }
    if (!chinese_text || chinese_text.trim().length == 0) {
        alert('中文释义为空')
        return
    }
    $('#add_button').button('loading');
    $.ajax({
        type: 'POST',
        url:  '/sentence/new',
        data: {english_content:$('#english_content').val(), chinese_content: $('#chinese_content').val()},
        dataType: 'json'
    }).done(function (data) {
        currentSentences.unshift(data.sentence);
        if (currentSentences.length > Config.page_size) {
            currentSentences.splice(currentSentences.length - 1, 1);
        }
        refreshSentences();
        resetModal();
        $('#add_sentence').modal('toggle');
    }).fail(function () {
        alert('fail');
        //resetModal();
        //$('#add_sentence').modal('toggle');
    });
}

