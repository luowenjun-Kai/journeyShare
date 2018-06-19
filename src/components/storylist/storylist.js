import './storylist.css'
import url from '../../config';
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
        //console.log('ssss')
    }
    render(){
        const itemContent=function (item) {
            //处理文章段落显示
            let content=item.content;
            let contentsm=content.replace(/<br>/g,"");
            content=content.split("<br>").map((item)=>{
                return <p>{item}</p>
            });
            return <div>
                <Row>
                    <Col className={"item-title"} lg={{span:12,offset:3}} xs={{span:13,offset:1}}><h2>{item.title}</h2><span>{item.createat}</span></Col>

                </Row>
                <Row className={"story-list-row"}>
                    <Col className={"item-col"}  lg={{span:0}} xs={{span:13,offset:1}}>
                        <div className={"item-content"} >
                            {contentsm}
                        </div>
                    </Col>
                    <Col className={"item-col"}  lg={{span:15,offset:3}} xs={{span:0}}>
                        <div className={"item-content-lg"}>
                            {content}
                        </div>
                    </Col>
                    <Col lg={{span:6}} xs={{span:9}} className={"story-list-col-img"}>
                        <div className={"item-imgdiv"}><img className={"item-img"} alt="cover" src={`${url.images}/${item.cover}/${item.journeyId}/5.jpg`} /></div>
                    </Col>
                </Row>
            </div>
        }
        return(
            <div id="body">
                <div id="list">
                    <List itemLayout="vertical" split dataSource={this.props.articles} renderItem={item =>(
                        <List.Item className="item" key={item.journeyId}   onClick={this.toStoryDetail.bind(this,item.journeyId)}>
                            {itemContent(item)}
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
