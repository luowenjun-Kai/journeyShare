import './navbar.css';

import React,{Component} from 'react';
import { Menu,Icon,Modal} from 'antd';
import { Col,Row } from "antd";
import { Input } from "antd";
import { Link } from 'react-router-dom'
//const SubMenu=Menu.SubMenu;
const Search=Input.Search;
const SubMenu = Menu.SubMenu;

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state=this.getInitialState();
        this.refShadow=React.createRef();
        this.refModal=React.createRef();
        this.showNav=this.showNav.bind(this);
    }
    getInitialState(){
        return {
            shadow:false
        }
    }
    showNav(){
        let modal=this.refModal.current;
        let shadow=this.refShadow.current;
        //console.log(modal + " " + shadow);
        this.state.shadow=!this.state.shadow;
        //如果出现阴影
        if(this.state.shadow){
            shadow.style.display='block';
            modal.className="navbar-modal navbar-modal-show";

        }
        else{
            shadow.style.display='none';
            modal.className="navbar-modal navbar-modal-hide"
        }
    }
    mouseEnter(event){
        let target=event.target;
        let divs=target.getElementsByTagName('div');
        //防止选中图标
        if(divs.length==2){
            let icon=divs[0];
            let title=divs[1];
            // console.log(target);
            //图标消失动画
            icon.className="navbar-col-icon-hide";
            //文字载入动画
            title.className="navbar-col-title-show";
        }

    }
    mouseLeave(event){
        let target=event.target;
        let divs=target.getElementsByTagName('div');
        if(divs.length==2){
            let icon=divs[0];
            let title=divs[1];
            console.log(target);
            //图标载入动画
            icon.className="navbar-col-icon-show";
            //文字载入动画
            title.className="navbar-col-title-hide";
        }

    }
    modalShow(element,size,time){
        let timer=setInterval(function () {

        })
    }
    render() {
        return (
            <div>
                <Row className="navbar">
                    <Col lg={{span:8}} sm={{span:0}} xs={{span:0}} className="logo">Logo
                    </Col>
                    <Col lg={{span:0}} sm={{span:8}} xs={{span:8}}>
                        {/*小屏导航栏*/}
                        {/*
                        <Menu mode={"vertical"}>
                            <SubMenu title={<span><Icon type={"menu-unfold"}/>Logo</span>}>
                                <Menu.Item><a href="/">首页</a></Menu.Item>
                                <Menu.Item><a href="/story">旅行奇遇</a></Menu.Item>
                                <Menu.Item><a href="/share">照片分享</a></Menu.Item>
                                <Menu.Item><a href="/support">支持</a></Menu.Item>
                            </SubMenu>
                        </Menu>
                        */}
                        <div onClick={this.showNav}>
                            logo
                        </div>
                    </Col>
                    <Col lg={{span:4,offset:2}} sm={{span:8}} xs={{span:10}} className="search">
                        {/*<Search placeholder="搜索" onSearch={value => console.log(value)} enterButton/>*/}
                    </Col>
                    {/*大屏的导航栏*/}
                    <Col lg={{span:8,offset:2}} sm={{span:0}} xs={{span:0}}>
                        <Menu mode="horizontal" className={"navbar-nounderline"}>
                            <Menu.Item><a href="/">首页</a></Menu.Item>
                            <Menu.Item><a href="/story">旅行奇遇</a></Menu.Item>
                            <Menu.Item><a href="/share">照片分享</a></Menu.Item>
                            <Menu.Item><a href="/support">支持</a></Menu.Item>
                        </Menu>
                    </Col>
                    {/*弹窗

                    */}

                </Row>
                <div ref={this.refShadow} className={"navbar-shadow"} onClick={this.showNav}></div>
                <div ref={this.refModal} className={'navbar-modal'}>
                    <Row className={"navbar-row"}>
                        <a href="/">
                            <Col span={8} className={"navbar-col"} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                <div><Icon type={"appstore"} style={{color:"#fff",fontSize:24}} /></div>
                                <div className={"navbar-col-title"}>首页</div>
                            </Col>
                        </a>
                        <a href="/story">
                            <Col span={8} className={"navbar-col"}onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                <Row><Icon type={"star-o"} style={{color:"#fff",fontSize:24}} /></Row>
                                <Row className={"navbar-col-title"}>旅行奇遇</Row>
                            </Col>
                        </a>
                        <a href="/share">
                            <Col span={8} className={"navbar-col"}onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                <Row><Icon type={"camera"} style={{color:"#fff",fontSize:24}}/></Row>
                                <Row className={"navbar-col-title"}>照片分享</Row>
                            </Col>
                        </a>
                        <a href="/support">
                            <Col span={8} className={"navbar-col"}onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                <Row><Icon type={"gift"} style={{color:"#fff",fontSize:24}}/></Row>
                                <Row className={"navbar-col-title"}>支持</Row>
                            </Col>
                        </a>

                    </Row>
                </div>
            </div>

        )

    }
}
