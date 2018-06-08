import './storylist.css'
import pic from  '../../assets/homeimg.jpg'
import React,{Component}from 'react';
import {List,Row,Col} from 'antd';
import {Timeline} from 'antd';
import createHistory from 'history/createBrowserHistory';
const history=createHistory({
    forceRefresh:true
});
export default class Storylist extends Component{
    constructor(props){
        super(props);
    }
    getTimeLines(){
        let lines=this.state.timeline.map((item)=>{
            return <Timeline.Item key={item.id}><a href="#">{item.time} {item.des}</a></Timeline.Item>
        })
        return lines;
    }
    toStoryDetail(id,event){
        //找到对应的joruenyid
        let item={};
        let articles=this.props.articles;
        for(let i in articles){
            if(id==articles[i].journeyId){
                item=articles[i];
                break;
            }
        }
        //传递数据
        history.push(`/story/detail/${id}`,{
            data:item
        });
        console.log('ssss')
    }
    render(){
        const itemContent=function (title,content) {
            return <div>
                <Row>
                    <Col className={"item-title"} lg={{span:12,offset:3}} xs={{span:13,offset:1}}><h2>{title}</h2></Col>
                </Row>
                <Row className={"story-list-row"}>
                    <Col className={"item-col"}  lg={{span:12,offset:3}} xs={{span:13,offset:1}}>
                        <div className={"item-content"} >
                            {content}
                        </div>
                    </Col>
                    <Col lg={{span:5}} xs={{span:9}} className={"story-list-col-img"}>
                        <div className={"item-imgdiv"}><img className={"item-img"} alt="logo" src={pic} /></div>
                    </Col>
                </Row>
            </div>
        }
        return(
            <div id="body">
                <div id="list">
                    <List itemLayout="vertical" split dataSource={this.props.articles} renderItem={item =>(
                        <List.Item className="item" key={item.journeyId}   onClick={this.toStoryDetail.bind(this,item.journeyId)}>
                            {itemContent(item.title,item.content)}
                        </List.Item>

                    )}

                    />
                </div>
                {/*
                <div id='aside'>
                    <h1>Time</h1>
                    <div id="timeline">
                        <Timeline>
                            {this.getTimeLines()}
                        </Timeline>
                    </div>

                </div>*/}
            </div>
        )
    }
}
