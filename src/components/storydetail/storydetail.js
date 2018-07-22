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
            display:'photos',
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
                this.setState({
                    options:this.getOptions(1)
                });
                break;
            case 2:
                item='photos';
                break;
            case 3:
                item='route';
                this.setState({
                    options:this.getOptions(3)
                });
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
        else if(code==3) { //区域路线图
            //处理行程字符串
            let routearr = this.state.journey.route.split(";");
            let sites =this.state.sitePos;
            if(sites==""){
                return {}
            }
            let series=[];
            let des=this.state.journey.destination.split("-")[0];
            console.log(des)
            routearr.forEach((item,index)=>{
                //routearr的长度代表行程天数
                let point=item.split("-");
                let data=[];
                let scatter=[];
                //每个景点查询其地理位置
                let length=point.length;
                for(let i=0;i<length-1;i++){
                    let obj={
                        fromName:point[i],
                        toName:point[i+1],
                        coords:[sites[point[i]],sites[point[i+1]]]
                    };
                    data.push(obj);
                    scatter.push({
                        name:point[i],
                        value:sites[point[i]]
                    });
                }
                //加入最后一个景点
                scatter.push({
                    name:point[length-1],
                    value:sites[point[length-1]]
                });
                let day={
                    type:'lines',
                    symbol:'none',
                    tooltip:{
                      trigger:'item',
                      formatter:`Day ${index+1} ${item}`
                    },
                    data:data
                };
                //加入地点描点
                let scaSeries={
                    type:'effectScatter',
                    coordinateSystem: 'geo',
                    symbolSize:5,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    data:scatter
                };
                series.push(day,scaSeries);
            });
            console.log(series)
            return {
                tooltip:{
                    trigger:'item'
                },
                geo:{
                    map:des,
                    roam:true,
                    silent:true,
                    scaleLimit:{
                        min:1,
                        max:200
                    },
                    label:{
                      show:true,
                      formatter: '{b}'
                    },
                    itemStyle:{
                        areaColor:'#f1f1f1',

                    },
                    emphasis:{
                        itemStyle:{
                            areaColor:'#80989b'
                        }

                    },
                    zoom:2,

                },
                series:series

            }
        }


    }
    zoomUp(){
        let options=JSON.parse(JSON.stringify(this.state.options));
        options.geo.zoom+=10;
        console.log(options);
        this.setState({
            options:options
        });
        this.forceUpdate()
    }
    zoomDown(){
        let options=JSON.parse(JSON.stringify(this.state.options));
        options.geo.zoom-=10;
        this.setState({
            options:options
        })
    }
    showAreaName(){
        let options=JSON.parse(JSON.stringify(this.state.options));;
        options.geo.label.show=!options.geo.label.show;
        this.setState({
            options:options
        })

    }
    showSiteName(){
        let options=JSON.parse(JSON.stringify(this.state.options));
        let series=options.series;
        for(let i in series){
            let obj=series[i];
            if(obj.type=="effectScatter"){
                obj.label.normal.show=!obj.label.normal.show
            }
        }
        this.setState({
            options:options
        })
    }
    render() {
        let article=this.state.article;
        let journey=this.state.journey;
        let baseurl=`${url.images}/${article.cover}/${article.journeyId}`;
        //处理文章段落
        let content=article.content;
        content=content.split("<br>").map((item,i)=>{
            if(item==""){
                return <br/>
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
        let whatToshow;
        if(this.state.display=='photos'){
            whatToshow=
                <Col sm={{span:24}} lg={{span:12}}  onClick={this.showShadow.bind(this)}>
                    <Row gutter={8} className={"row"}>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/1.jpg'} alt={""}></img></div></Col>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/2.jpg'} alt={""}></img></div></Col>
                        <Col span={8}><div className={"detail-div"}><img src={baseurl + '/3.jpg'} alt={""}></img></div></Col>
                    </Row>
                    <Row gutter={8} className={"row"}>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/4.jpg'} alt={""}></img></div></Col>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/5.jpg'} alt={""}></img></div></Col>
                        <Col span={8}><div className={"detail-div"}><img src={baseurl + '/6.jpg'} alt={""}></img></div></Col>
                    </Row>
                    <Row gutter={8} className={"row"}>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/7.jpg'} alt={""}></img></div></Col>
                        <Col span={8} ><div className={"detail-div"}><img src={baseurl + '/8.jpg'} alt={""}></img></div></Col>
                        <Col span={8}><div className={"detail-div"}><img src={baseurl + '/9.jpg'} alt={""}></img></div></Col>
                    </Row>
                </Col>
        }
        else if(this.state.display=='overview'){
            whatToshow=
                <Col sm={{span:24}} lg={{span:12}}>
                    <ReactEcharts option={this.state.options} notMerge={true}/>
                </Col>
        }
        else if(this.state.display=='route'){
            whatToshow=
                <Col sm={{span:24}} lg={{span:12}} className={"route-col"}>
                    <ReactEcharts option={this.state.options} notMerge={true}/>
                    <div className={"route-footer"}>
                        <span onClick={this.zoomUp.bind(this)}><img src={add} alt={"放大"}/></span>
                        <span onClick={this.zoomDown.bind(this)}><img src={sub} alt={"缩小"}/></span>
                        <span onClick={this.showAreaName.bind(this)}><img src={cityimg} alt={"显示城区名"}/></span>
                        <span onClick={this.showSiteName.bind(this)}><img src={siteimg} alt={"显示景点名"}/></span>
                    </div>
                </Col>
        }

        //console.log(content)

        return (
            <div className="body">
                {/*弹出层*/}
                <div className={"detail-shadow"} ref={this.refShadow} onClick={this.showShadow.bind(this)}></div>
                <div className={"detail-modal" } ref={this.refModal}><img></img></div>
                <div className="detail-title">
                    <Row>
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
