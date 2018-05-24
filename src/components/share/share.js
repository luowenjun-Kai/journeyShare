import './share.css';
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col} from 'antd';
export  default class Share extends Component{
    render() {
        return (
            <div className="body">
                <div className="msg">
                    <Row>
                        <Col lg={{span:8,offset:8}}>深圳</Col>
                        <Col lg={{span:8,offset:12}}>深圳野生动物园</Col>
                    </Row>
                </div>
                <div className="images">
                    <Row className="hgt-4">
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>

                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                        <Col lg={{span:3}}><img src={pic}></img></Col>
                    </Row>
                    <Row className="hgt-3">
                        <Col lg={{span:8}}><img src={pic}></img></Col>
                        <Col lg={{span:8}}><img src={pic}></img></Col>
                        <Col lg={{span:8}}><img src={pic}></img></Col>
                    </Row>
                </div>
                <div className="msg">
                    <Row>
                        <Col lg={{span:2,offset:18}}>2018-2-16</Col>
                        <Col lg={{span:2}}>600元</Col>
                        <Col lg={{span:2}}>6天</Col>
                    </Row>
                </div>
                <div className="story">
                    something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.something you want to share.
                </div>


            </div>
        )
    }
}