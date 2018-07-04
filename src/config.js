//const baseurl='http://localhost'
const baseurl='http://39.108.236.3';
const serverurl=baseurl + ':30001';
const url={
    images:baseurl + '/images',
    getArticles:serverurl + '/api/articles',
    getJourney: serverurl + '/api/detail?journeyId=',
    getJneyByDes:serverurl + '/api/provDes?province=',
    getAtclByid:serverurl + '/api/getAtclbyid?journeyId=',
    getbeian:"http://www.miitbeian.gov.cn",
    setTime:function (t) {
        console.log(t)
        let time=new Date(t);
        let year=time.getFullYear();
        let raw_month=time.getMonth() + 1;
        let month=raw_month<=9?'0'+raw_month:raw_month;
        let raw_date=time.getDate();
        let date=raw_date<=9?'0'+raw_date:raw_date;
        return year + '/' + month + '/' + date;
    }
}

module.exports=url;
