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
        console.log(data + " " + detail);
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

        return {
            article:data,
            journey:detail
        }
    }
    render() {
        let article=this.state.article;
        let journey=this.state.journey;
        let baseurl=`${url.images}/${article.cover}/${article.journeyId}`;
        //处理文章段落
        let content=article.content;
        content=content.split("<br>").map((item)=>{
            return <p>{item}</p>
        })
        //console.log(content)
        return (
            <div className="body">
                <div className="detail-title">
                    <Row>
                        <Col lg={{span:8,offset:8}}><h1>{article.title}</h1></Col>
                        <Col lg={{span:24,offset:5}}>{article.subtitle}</Col>
                    </Row>
                </div>
                <Row id="quick">
                    <Col sm={{span:24}} lg={{span:12}} className="images">
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
                    <Col sm={{span:24}} lg={{span:12}} className="msg">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header={"概览"} key={"1"}>
                                <Col lg={{span:8}}>出发时间：{journey.deptime}</Col>
                                <Col lg={{span:8}}>总花费：{journey.cost}</Col>
                                <Col lg={{span:8}}>耗时：{journey.duration}天</Col>
                            </Panel>
                            <Panel header={"摄影穿搭"} key={"2"}>
                                <Col lg={{span:24}}>{journey.photomacth}</Col>
                            </Panel>
                            <Panel header={"行程路线"} key={"3"}>
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
