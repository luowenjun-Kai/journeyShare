import './deslist.css';
import React,{ Component } from 'react';
import {List,Card,Col} from 'antd';
import url from '../../config';
import pic from '../../assets/homeimg.jpg'
const { Meta} =Card;
export default class Deslist extends Component{
    constructor(props){
        super(props);
    }
    getJourney(event){
        let target=event.currentTarget;
        let id=target.getAttribute('data-id');
        this.props.setJourney(id);
    }
    render(){
        const data=this.props.data;
        //如果没有数据返回
        if(data.length==0){
            return (
                <div>没有这个地方的记录哦！</div>
            )
        }
        else{
            return(
                <div className={"deslist-list"}>
                    <List
                        dataSource={data}
                        renderItem={item => (
                            <div>
                                <Col lg={{span:6}} xs={{span:0}} className={"deslist-col"} >
                                    <div className={"deslist-div-col"}  data-id={item.journeyId} onClick={this.getJourney.bind(this)}>
                                        <img className={"deslist-div-img"} alt={item.des} src={url.images + `/${item.cover}/${item.journeyId}/1.jpg`}/>
                                        <div className={"deslist-div-msg"}>
                                            <p className={"deslist-des"}>{item.des}</p>
                                            <p className={"deslist-itme"}>{item.time}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={{span:0}} xs={{span:12}} className={"deslist-col"} >
                                    <div className={"deslist-div-col"} onClick={this.getJourney.bind(this)} data-id={item.journeyId}>
                                        <img className={"deslist-div-img"} alt={item.des} src={url.images + `/${item.cover}/${item.journeyId}/1.jpg`}/>
                                        <div className={"deslist-div-xs-msg"}>
                                            <p className={"deslist-xs-des"}>{item.des}</p>
                                            <p className={"deslist-xs-time"}>{item.time}</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>



                        )}
                    />
                </div>
            )
        }

    }
}
