/**
 * Created by lijie8 on 2015/2/1.
 */

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
    $('#sentence_form').submit()
}
