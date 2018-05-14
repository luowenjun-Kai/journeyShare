import './navbar.css';

import React,{Component} from 'react';
import { Menu} from 'antd';
import { Col,Row } from "antd";
import { Input } from "antd";
//const SubMenu=Menu.SubMenu;
const Search=Input.Search;


export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Row className="navbar">
                    <Col span={8} className="logo">Logo</Col>
                    <Col span={4} offset={2} className="search">
                        <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton/>
                    </Col>
                    <Col span={8} offset={2}>
                        <Menu mode="horizontal">
                            <Menu.Item>首页</Menu.Item>
                            <Menu.Item>地图足迹</Menu.Item>
                            <Menu.Item>旅行故事</Menu.Item>
                            <Menu.Item>照片分享</Menu.Item>
                            <Menu.Item>支持</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )

    }
}