//时间戳转化为时间格式
var formatDate = function(date){
    date = new Date(date);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHours();
    var m1=date.getMinutes();
    var s=date.getSeconds();
    m = m<10?("0"+m):m;
    d = d<10?("0"+d):d;
    return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
}

//时间格式转化为时间戳
function timeChangetype(stringTime){
    var timestamp2 = Date.parse(new Date(stringTime));
//      timestamp2 = timestamp2;
    return timestamp2;
}

function getDiffTime(recordTime,yearsFlag) {
    if (recordTime) {
        recordTime=new Date(parseFloat(recordTime)*1000);
        var minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            now=new Date(),
            diff = now -recordTime;
        var result = '';
        if (diff < 0) {
            return result;
        }
        var weekR = diff / (7 * day);
        var dayC = diff / day;
        var hourC = diff / hour;
        var minC = diff / minute;
        if (weekR >= 1) {
            var formate='MM-dd hh:mm';
            if(yearsFlag){
                formate='yyyy-MM-dd hh:mm';
            }
            return recordTime.format(formate);
        }
        else if (dayC == 1 ||(hourC <24 && recordTime.getDate()!=now.getDate())) {
            result = '昨天'+recordTime.format('hh:mm');
            return result;
        }
        else if (dayC > 1) {
            var formate='MM-dd hh:mm';
            if(yearsFlag){
                formate='yyyy-MM-dd hh:mm';
            }
            return recordTime.format(formate);
        }
        else if (hourC >= 1) {
            result = parseInt(hourC) + '小时前';
            return result;
        }
        else if (minC >= 1) {
            result = parseInt(minC) + '分钟前';
            return result;
        } else {
            result = '刚刚';
            return result;
        }
    }
    return '';
}