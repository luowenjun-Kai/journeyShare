//const baseurl='http://localhost'
const baseurl='http://39.108.236.3';
const serverurl=baseurl + ':30001';
const url={
    images:baseurl + '/images',
    getArticles:serverurl + '/api/articles',
    getJourney: serverurl + '/api/detail?journeyId=',
    getJneyByDes:serverurl + '/api/provDes?province='
}

module.exports=url;
