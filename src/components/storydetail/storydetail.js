import './storydetail.css';
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col} from 'antd';
import { Collapse } from 'antd';
const Panel=Collapse.Panel;
export  default class StoryDetail extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();

    }
    getInitialState(){
        let data=this.props.location.state.data;
        console.log(data);
        if(data===undefined){
            data={
                title:"",
                subtitle:"",
                content:"",
                starttime:"",
                duration:"",
                money:"",
                cover:"",
            }
        }
        return {
            journey:data
        }
    }
    render() {
        let baseurl=`points/${this.state.journey.cover}`;
        return (
            <div className="body">
                <div className="title">
                    <Row>
                        <Col lg={{span:8,offset:8}}>{this.state.journey.title}</Col>
                        <Col lg={{span:8,offset:12}}>{this.state.journey.subtitle}</Col>
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
                                <Col lg={{span:5,offset:2}}>出发时间：{this.state.journey.starttime}</Col>
                                <Col lg={{span:5}}>总花费：{this.state.journey.money}元</Col>
                                <Col lg={{span:5}}>耗时：{this.state.journey.duration}天</Col>
                            </Panel>
                            <Panel header={"摄影穿搭"} key={"2"}>
                                <Col lg={{span:24}}>想要体现动物的俏皮可爱，可以穿搭黄色T恤等明亮色系的衣服，尽可能和动物多进行互动，将相机设置为连拍模式可以抓拍出自然的人物表情</Col>
                            </Panel>
                            <Panel header={"行程路线"} key={"3"}>
                                <Col lg={{span:5,offset:2}}>1-2-3</Col>
                            </Panel>
                            <Panel header={"故事分享"} key={"4"}>
                                <div>
                                    {this.state.journey.content}
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>


            </div>
        )
    }
}
