import './navbar.css';

import React,{Component} from 'react';
import { Menu} from 'antd';
import { Col,Row } from "antd";
import { Input } from "antd";
//import { Link } from 'react-router-dom'
//const SubMenu=Menu.SubMenu;
const Search=Input.Search;


export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Row className="navbar">
                    <Col span={8} className="logo">Logo</Col>
                    <Col lg={{span:4,offset:2}} sm={{span:8}} className="search">
                        <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton/>
                    </Col>
                    <Col lg={{span:8,offset:2}} sm={{span:0}} xs={{span:0}}>
                        <Menu mode="horizontal">
                            <Menu.Item><a href="/">首页</a></Menu.Item>
                            <Menu.Item><a href="footprint">地图足迹</a></Menu.Item>
                            <Menu.Item><a href="story">旅行故事</a></Menu.Item>
                            <Menu.Item><a href="share">照片分享</a></Menu.Item>
                            <Menu.Item><a href="support">支持</a></Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )

    }
}