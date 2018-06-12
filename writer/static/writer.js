let baseurl='http://localhost:9095';
let getid=baseurl+'/api/getid';
let insertJour=baseurl + '/api/insertJ';
let insertArti=baseurl + '/api/insertA';
$(document).ready(function () {
    console.log('hello jquery');
    //为按钮添加点击事件
    $('#jneybutt').click(setJourney);
    $('#atclebutt').click(setArticle);
    $('#atcleflash').click(getJourneyAvailable);
})
function setJourney() {
    console.log('journey');
    //获取输入内容
    let elements=$('#form-journey input:lt(4)');
    let contents=$('#form-journey textarea');
    let temp=elements[0].value.split('/');
    let month=temp[1]<=9?'0'+temp[1]:temp[1];
    let day=temp[2]<=9?'0'+temp[2]:temp[2];
    let journeyId=temp[0] + month + day;
    let data={
        journeyId:journeyId,
        deptime:elements[0].value,
        duration:elements[1].value,
        cost:elements[2].value,
        destination:elements[3].value,
        photomacth:contents[0].value,
        route:contents[1].value,
    }
    console.log("准备发送数据： " + JSON.stringify(data));
    $.post(insertJour,data,function (res) {
        console.log(JSON.stringify(res));
    })

}
function setArticle() {
    console.log('article');
    let elements=$('#form-article input:lt(5)');
    let content=$('#content').val();
    let id=$('#journeyid ').val();
    let creatat=new Date();
    let data={
        title:elements[0].value,
        subtitle:elements[1].value,
        cover:elements[2].value,
        destination:elements[3].value,
        author:elements[4].value,
        content:content,
        journeyId:id,
        createat:creatat
    }
    console.log('文章提交数据： ' + JSON.stringify(data));
    $.post(insertArti,data,function (res) {
        console.log(JSON.stringify(res));
    })

}
function getJourneyAvailable() {
    console.log('get journeys');
    $.get(getid,function (res) {
        console.log(res);
        let options="";
        for(let i in res){
            options+=`<option value=${res[i].journeyId} >${res[i].journeyId}</option>`
        }
        $('#journeyid').html(options);
    });
    return false;
}
