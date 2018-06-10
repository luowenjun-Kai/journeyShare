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
        console.log('detail 准备发送' + journeyid);
        axios.get(url.getJourney + journeyid ).then((res)=>{
            let data=res.data;
            console.log('in detail the data is ' + JSON.stringify(data));
            data.deptime=new Date(data.deptime).toLocaleDateString();
            this.setState({
                journey:data
            })
        })
    }
    getInitialState(){
        //初始化文章和行程细节
        let data=this.props.location.state.data;
        let detail={
            duration:0,
            cost:0,
            photomacth:'-',
            route:'-',
            deptime:''
        };
        console.log(data);
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

        return {
            article:data,
            journey:detail
        }
    }
    render() {
        let article=this.state.article;
        let journey=this.state.journey;
        let baseurl=`${url.images}/${article.cover}/${article.journeyId}`;
        console.log(journey)
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
                                    {article.content}
                                </Col>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>


            </div>
        )
    }
}
