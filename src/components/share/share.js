import './share.css';
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col} from 'antd';
import { Collapse } from 'antd';
const Panel=Collapse.Panel;
export  default class Share extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
    }
    getInitialState(){
        return {
            journey:{
                title:'深圳',
                subtitle:'深圳野生动物园',
                starttime:'2018-2-16',
                money:600,
                duration:6,
                content:'something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.',
                img:[pic]
            }
        }
    }
    render() {
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
                            <Col span={8}  ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8} ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8}><img src={this.state.journey.img[0]} alt={""}></img></Col>
                        </Row>
                        <Row gutter={8} className={"row"}>
                            <Col span={8}  ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8} ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8}><img src={this.state.journey.img[0]} alt={""}></img></Col>
                        </Row>
                        <Row gutter={8} className={"row"}>
                            <Col span={8}  ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8} ><img src={this.state.journey.img[0]} alt={""}></img></Col>
                            <Col span={8}><img src={this.state.journey.img[0]} alt={""}></img></Col>
                        </Row>
                    </Col>
                    <Col sm={{span:24}} lg={{span:12}} className="msg">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header={"概览"} key={"1"}>
                                <Col lg={{span:5,offset:2}}>出发时间：{this.state.journey.starttime}</Col>
                                <Col lg={{span:5}}>总花费：{this.state.journey.money}元</Col>
                                <Col lg={{span:5}}>耗时：{this.state.journey.duration}天</Col>
                            </Panel>
                            <Panel header={"行程路线"} key={"2"}>
                                <Col lg={{span:5,offset:2}}>1-2-3</Col>
                            </Panel>
                            <Panel header={"故事分享"} key={"3"}>
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
