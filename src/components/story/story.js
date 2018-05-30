import './story.css'
import pic from  '../../assets/homeimg.jpg'
import React,{Component}from 'react';
import {List} from 'antd';
import {Timeline} from 'antd';
export default class Story extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
    }
    getInitialState(){
        return {
            timeline:[
                {time:'2017-5-5',des:'稻城'},
                {time:'2016-5-5',des:'桂林'},
                {time:'2014-1-28',des:'凤凰'},
                {time:'2012-7-5',des:'成都'},
            ]
        }
    }
    getTimeLines(){
        let lines=this.state.timeline.map((item)=>{
            return <Timeline.Item><a href="#">{item.time} {item.des}</a></Timeline.Item>
        })
        return lines;
    }

    render(){
        const data=[
            {
                title:"Hello world",
                describe:"this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.",
                cover:'../../assets/homeimg.jpg'
            },
            {
                title:"Hello world",
                describe:"this is my first time to visit here and i do not know what to write about."
            },
            {
                title:"Hello world",
                describe:"this is my first time to visit here and i do not know what to write about."
            },
        ]
        return(
            <div id="body">
                <div id="list">
                    <List itemLayout="vertical" dataSource={data} renderItem={item =>(
                        <List.Item extra={<img width={200} alt="logo" src={pic} />}>
                            <List.Item.Meta title={item.title} description={item.describe}/>
                        </List.Item>
                    )}

                    />
                </div>
                <div id='aside'>
                    <h1>Time</h1>
                    <div id="timeline">
                        <Timeline>
                            {this.getTimeLines()}
                        </Timeline>
                    </div>

                </div>
            </div>
        )
    }
}
