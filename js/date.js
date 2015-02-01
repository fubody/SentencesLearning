Date.prototype.format = function(format)
{
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(),    //day
	"h+" : this.getHours(),   //hour
 	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
 	"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 	"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) 
	{
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	
 	for(var k in o)
	{
		if(new RegExp("("+ k +")").test(format))
		{
 			format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

var string_formater = function(str) {
	if (!str) return '';
	return str;
}

var bool_formater = function(value) {
	if (value) {
		return 'Y';
	}
	return '';
}

var date_formater = function(datetime, format) {
	if (!datetime) return '';
	datetime = new Date(Date.parse(datetime));
	if (format) {
		return datetime.format(format);
	}
	return datetime.format("yyyy/MM/dd hh:mm:ss");
}

exports.date_formater = date_formater;