
const getFormatEndDate = (date) => {
    var transDate = new Date()
    transDate.setTime(date.getTime() + (100 * 24 * 60 * 60 * 1000)) //100일에 해당하는 유닉스 밀리초타임을 transDate 에 적용.
    transDate.toLocaleString() // 현날짜로 부터 100일뒤의 표준시로 설정
    var year = transDate.getFullYear();              //yyyy
    var month = (1 + transDate.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = transDate.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return year + '.' + month + '.' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능

};
module.exports = getFormatEndDate;