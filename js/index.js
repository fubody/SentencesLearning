/**
 * Created by lijie8 on 2015/2/7.
 */

document.onkeypress=function(event){
    if (event.keyCode == 65 || event.keyCode == 97) {
        //'A'
        turnToAdmin();
    } else if (event.keyCode == 76 || event.keyCode == 108) {
        //'L'
        turnToPractice();
    }
}

function turnToPractice() {
    document.location.href = '/practice';
}

function turnToAdmin() {
    document.location.href = '/admin';
}