import axios from 'axios';
//const baseurl='http://localhost'
const baseurl='https://hoshimi.cn';
const serverurl=baseurl + ':30001';
const url={
    images:baseurl + '/images',
    getArticles:serverurl + '/api/articles',
    getJourney: serverurl + '/api/detail?journeyId=',
    getJneyByDes:serverurl + '/api/provDes?province=',
    getAtclByid:serverurl + '/api/getAtclbyid?journeyId=',
    getCost:serverurl+'/api/getcost?journeyId=',
    getSiteByDes:serverurl + '/api/getsite?destination=',
    getbeian:"http://www.miitbeian.gov.cn",
    gaodeKey:"b54dcc8109bb76644b71845084bd9080",
    setTime:function (t) {
        let time=new Date(t);
        let year=time.getFullYear();
        let raw_month=time.getMonth() + 1;
        let month=raw_month<=9?'0'+raw_month:raw_month;
        let raw_date=time.getDate();
        let date=raw_date<=9?'0'+raw_date:raw_date;
        return year + '/' + month + '/' + date;
    },
    loadSites:function(sites,route){
        // 每个景点的数组
        let ar = route.split(';')
        let points=[];
        ar.forEach(str =>{
            let items = str.split('-');
            items.forEach(item=>{
                points.push(item)
            })
        })
        if(JSON.stringify(sites) !== '{}'){
            let url="https://uri.amap.com/marker";
            let markers='';
            for(let value of points){
                markers+=`${sites[value][0]},${sites[value][1]},${value}|`
            }
            return `${url}?markers=${markers}&src=hoshimi`
        }


    }
}

export default url
