import './storydetail.css';
import url from '../../config';
import React,{Component} from 'react';
import { Row,Col} from 'antd';
import { Collapse } from 'antd';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import add from '../../assets/add.svg';
import sub from '../../assets/subtract.svg';
import cityimg from '../../assets/icon_city.svg';
import siteimg from '../../assets/site.svg';
const Panel=Collapse.Panel;
require('echarts/map/js/province/hunan');
require('echarts/map/js/province/sichuan');
require('echarts/map/js/province/guangdong');
export  default class StoryDetail extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
        this.refShadow=React.createRef();
        this.refModal=React.createRef();
        //this.selectChange=this.selectChange.bind(this);
    }
    componentDidMount(){
        let journeyid=this.state.article.journeyId;
        let costJid='';
        let destination='';
        if(journeyid===''){
            //获取文章信息
            costJid=this.state.journey.journeyId;
            destination=this.state.journey.destination;
            axios.get(url.getAtclByid + this.state.journey.journeyId).then((res)=>{
                let data=res.data;
                this.setState({
                    article:data
                })
            })
        }
        else{
            //获取游记信息
            costJid=journeyid;
            destination=this.state.article.destination;
            console.log('detail 准备发送' + journeyid);
            axios.get(url.getJourney + journeyid ).then((res)=>{
                let data=res.data;
               // console.log('in detail the data is ' + JSON.stringify(data));
                data.deptime=url.setTime(data.deptime);
                this.setState({
                    journey:data
                })
                return;
            })
        }
        axios.get(url.getCost + costJid).then((res)=>{
            //处理数据符合格式
            let data=[];
            Object.keys(res.data).forEach((item)=>{
                let obj={
                    type:item,
                    cost:res.data[item]
                }
                data.push(obj)
            });
            this.setState({
                overview:data
            })
        });
        axios.get(url.getSiteByDes + destination).then((res)=>{
            let data=res.data;
            this.setState({
                sitePos:data
            })
        })

    }
    getInitialState(){
        //初始化文章和行程细节
        let data=this.props.location.state.data;
        let detail=this.props.location.state.detail;
        //概览图数据，路线图数据
        let overview,route;
        if(data===undefined){
            data={
                title:'',
                subtitle:'',
                cover:'',
                destination:'',
                content:'',
                author:'',
                journeyId:''
            }
        }
        if(detail===undefined){
            detail={
                journeyId:'',
                deptime:'',
                duration:0,
                cost:0,
                route:'',
                photomacth:''
            }
        }
        overview=[]
        return {
            article:data,
            journey:detail,
            shadow:false,
            display:'overview',
            overview:overview,
            options:{},
            sitePos:{}
        }
    }
    showShadow(event){
        let modal=this.refModal.current;
        let shadow=this.refShadow.current;
        this.state.shadow=!this.state.shadow;
        //如果出现阴影
        if(this.state.shadow){
            shadow.style.display='block';
            modal.setAttribute('class','detail-modal detail-modal-show');
            let img=event.target;
            let imgUrl=img.getAttribute('src');
           // console.log(imgUrl)
            let imgtag=modal.getElementsByTagName('img')[0];
            imgtag.setAttribute('src',imgUrl);
           // modal.className="navbar-modal navbar-modal-show";

        }
        else{
            shadow.style.display='none';
            modal.setAttribute('class','detail-modal detail-modal-hide');
           // modal.className="navbar-modal navbar-modal-hide"
        }
    }
    selectChange(arr){
        let active=arr.length==0?1:parseInt(arr[arr.length-1]);
        let item='';
        switch (active){
            case 1:
                item='overview';
                break;
            case 2:
                item='photos';
                break;
            case 3:
                item='route';
                break;
            case 4:
                item='story';
                break;
        }
        this.setState({
            display:item
        })
        //console.log(this.state.display)
    }
    getOptions(code){
        //图标数据转换
        if(code==1){ //消费分布图
            let rawtext=this.state.article.destination.split('-')[1]
            let rawdata=this.state.overview;
            let duration=this.state.journey.duration;
            let text=rawtext + duration + '天行程消费分布图'
            let data=rawdata.map((item)=>{
                let type=item.type;
                let name;
                switch (type){
                    case 'food':
                        name='饮食';
                        break;
                    case 'hotel':
                        name='住宿';
                        break;
                    case 'transport':
                        name='交通';
                        break;
                    case 'shop':
                        name='购物';
                        break;
                    case 'scenic':
                        name='景点';
                        break;
                    case 'other':
                        name='其他';
                        break;
                }
                return {
                    name:name,
                    value:item.cost
                }
            })
            return {
                title: {
                    text: text,
                    subtext: '',
                    x: 'center'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['饮食', '住宿', '交通', '景点', '购物', '其他']
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                series:[
                    {
                        name:'半径模式',
                        type:'pie',
                        radius:['10%','50%'],
                        roseType:'radius',
                        center : ['50%', '50%'],
                        data:data
                    }]
            }
        }
    }
    getpics(article,journey,baseurl) {
        let divs=[];
        for(let i=0;i<9;i++){
            divs.push(i)
        }
        let res=divs.map((item,i)=>{
            if(article.cover && journey.journeyId){
                return <Col span={8} key={i} style={{padding:'6px'}}><div className={"detail-div"}><img src={baseurl+`/${i+1}.jpg`}/></div></Col>
            }

        });
       //console.log(res)
        return res;

    }
    componentWillUpdate(){
        let show=document.querySelector(".item-fade");
        if(show){
            let classname=show.classList;
            classname.remove("item-fade-in")
           // classname.add("item-fade-out")
           // console.log(show.classList)
        }

    }
    componentDidUpdate(){
        let show=document.querySelector(".item-fade");
        if(show){
            let classname=show.classList;
            classname.remove("item-fade-out")
            classname.add("item-fade-in")
           // console.log(show.classList)
        }
    }
    render() {
        let article=this.state.article;
        let journey=this.state.journey;
        let baseurl=`${url.images}/${article.cover}/${article.journeyId}`;
        //处理文章段落
        let content=article.content;
        content=content.split("<br>").map((item,i)=>{
            if(item==""){
                return <br key={i}/>
            }
            else{
                return <p key={i}>{item}</p>
            }

        })
        //处理行程段落
        let route=journey.route;
        route=route.split(";").map((item,i)=>{
            return <p key={i}>Day {i+1}-{item}</p>
        })
        let src = url.loadSites(this.state.sitePos,this.state.journey.route)
        let options = this.getOptions(1)
        let whatToshow = 
            // 照片
            <div>
                <Col data-part="photos" sm={{span:24}} lg={{span:12}}  onClick={this.showShadow.bind(this)} className={this.state.display=='photos' ? "item-fade" :'title-hide'}>
                    <Row gutter={8} className={"row"}>
                        {this.getpics.call(this,article,journey,baseurl)}
                    </Row>
                </Col>
                <Col data-part="overview" sm={{span:24}} lg={{span:12}} className={this.state.display=='overview' ? "item-fade" : 'title-hide'}>
                    <ReactEcharts option={options} notMerge={true}/>
                </Col>
                <Col data-part="route" sm={{span:24}} lg={{span:12}} className={this.state.display=='route' ? "route-col item-fade" :'title-hide'}>
                    <div id="iframe-wrap">
                        <iframe src={src}></iframe>
                    </div>
                </Col>
                <Col data-part="story" sm={{span:24}} lg={{span:12}} className={this.state.display=='story' ? "" :'title-hide'}></Col>
            </div>
             
            
        //console.log(content)

        return (
            <div className="body">
                {/*弹出层*/}
                <div className={"detail-shadow"} ref={this.refShadow} onClick={this.showShadow.bind(this)} >
                    <div className={"detail-modal" } ref={this.refModal}><img></img></div>
                </div>
                
                <div className="detail-title">
                    <Row className={this.state.display ==='route' ? 'title-hide' :''}>
                        <Col lg={{span:8,offset:8}}><h1>{article.title}</h1></Col>
                        <Col lg={{span:24,offset:5}}>{article.subtitle}</Col>
                    </Row>
                </div>
                <Row id="quick" >
                    {whatToshow}
                    <Col sm={{span:24}} lg={{span:12}} className="msg">
                        <Collapse bordered={false} defaultActiveKey={['1']} onChange={this.selectChange.bind(this)}>
                            <Panel header={"概览"} key={"1"} >
                                <Col lg={{span:8}}>出发时间：{journey.deptime}</Col>
                                <Col lg={{span:8}}>总花费：{journey.cost}</Col>
                                <Col lg={{span:8}}>耗时：{journey.duration}天</Col>
                            </Panel>
                            <Panel header={"摄影穿搭"} key={"2"} >
                                <Col lg={{span:24}}>{journey.photomacth}</Col>
                            </Panel>
                            <Panel header={"行程路线"} key={"3"} >
                                <Col lg={{span:24}} className={"story-detail-route"}>{route}</Col>
                            </Panel>
                            <Panel header={"故事分享"} key={"4"}>
                                <Col lg={{span:24}}>
                                    <div className={"story-detail-content"}>
                                        {content}
                                    </div>
                                </Col>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>


            </div>
        )
    }
}
