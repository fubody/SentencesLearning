/**
 * Created by lijie8 on 2015/2/1.
 */

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function getPercent(value, total) {
    value = parseFloat(value)
    total = parseFloat(total)
    if (isNaN(value) || isNaN(total)) {
        return 0;
    }
    return total <= 0 ? 0 : (Math.round(value / total * 10000) / 100.00);
}