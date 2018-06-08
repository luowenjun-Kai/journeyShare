import './storydetail.css';
import pic from '../../assets/homeimg.jpg';
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
        axios.get(`http://localhost:9095/api/detail?journeyId=${journeyid}` ).then((res)=>{
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
        let baseurl=`points/${this.state.article.cover}`;
        baseurl="points/riben";
        let article=this.state.article;
        let journey=this.state.journey;
        console.log(journey)
        return (
            <div className="body">
                <div className="title">
                    <Row>
                        <Col lg={{span:8,offset:8}}>{article.title}</Col>
                        <Col lg={{span:8,offset:12}}>{article.subtitle}</Col>
                    </Row>
                </div>
                <Row id="quick">
                    <Col sm={{span:24}} lg={{span:12}} className="images">
                        <Row gutter={8} className={"row"}>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/1.JPG`)} alt={""}></img></Col>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/2.JPG`)} alt={""}></img></Col>
                            <Col span={8}><img src={require(`../../assets/${baseurl}/3.JPG`)} alt={""}></img></Col>
                        </Row>
                        <Row gutter={8} className={"row"}>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/4.JPG`)} alt={""}></img></Col>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/5.JPG`)} alt={""}></img></Col>
                            <Col span={8}><img src={require(`../../assets/${baseurl}/6.JPG`)} alt={""}></img></Col>
                        </Row>
                        <Row gutter={8} className={"row"}>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/7.JPG`)} alt={""}></img></Col>
                            <Col span={8} ><img src={require(`../../assets/${baseurl}/8.JPG`)} alt={""}></img></Col>
                            <Col span={8}><img src={require(`../../assets/${baseurl}/9.JPG`)} alt={""}></img></Col>
                        </Row>
                    </Col>
                    <Col sm={{span:24}} lg={{span:12}} className="msg">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header={"概览"} key={"1"}>
                                <Col lg={{span:5,offset:2}}>出发时间：{journey.deptime}</Col>
                                <Col lg={{span:5}}>总花费：{journey.cost}</Col>
                                <Col lg={{span:5}}>耗时：{journey.duration}天</Col>
                            </Panel>
                            <Panel header={"摄影穿搭"} key={"2"}>
                                <Col lg={{span:24}}>{journey.photomacth}</Col>
                            </Panel>
                            <Panel header={"行程路线"} key={"3"}>
                                <Col lg={{span:5,offset:2}}>{journey.route}</Col>
                            </Panel>
                            <Panel header={"故事分享"} key={"4"}>
                                <div>
                                    {article.content}
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>


            </div>
        )
    }
}
