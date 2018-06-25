import './storydetail.css';
import url from '../../config';
import React,{Component} from 'react';
import { Row,Col} from 'antd';
import { Collapse } from 'antd';
import axios from 'axios';
const Panel=Collapse.Panel;
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
        if(journeyid===''){
            //获取文章信息
            axios.get(url.getAtclByid + this.state.journey.journeyId).then((res)=>{
                let data=res.data;
                this.setState({
                    article:data
                })
            })
        }
        else{
            //获取游记信息
            console.log('detail 准备发送' + journeyid);
            axios.get(url.getJourney + journeyid ).then((res)=>{
                let data=res.data;
                console.log('in detail the data is ' + JSON.stringify(data));
                data.deptime=url.setTime(data.deptime);
                this.setState({
                    journey:data
                })
            })
        }

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
        overview=[
            {type:'food',cost:200},
            {type:'hotel',cost:500},
            {type:'transport',cost:100},
            {type:'shop',cost:0},
            {type:'menpiao',cost:0},
            {type:'other',cost:15}
        ]
        return {
            article:data,
            journey:detail,
            shadow:false,
            display:'photos'
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
        }
        this.setState({
            display:item
        })
        //console.log(this.state.display)
    }

    render() {
        let article=this.state.article;
        let journey=this.state.journey;
        let baseurl=`${url.images}/${article.cover}/${article.journeyId}`;
        //处理文章段落
        let content=article.content;
        content=content.split("<br>").map((item,i)=>{
            return <p key={i}>{item}</p>
        })
        let whatToshow;
        if(this.state.display=='photos'){
            whatToshow=
                <Col sm={{span:24}} lg={{span:12}} className="images" onClick={this.showShadow.bind(this)}>
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
                <Col>
                    此处是概览
                </Col>
        }
        else if(this.state.display=='route'){
            whatToshow=
                <Col>
                    此处是线路
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
                                <Col lg={{span:24}}>{journey.route}</Col>
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
