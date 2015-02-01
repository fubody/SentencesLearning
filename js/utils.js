/**
 * Created by lijie8 on 2015/2/1.
 */

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}