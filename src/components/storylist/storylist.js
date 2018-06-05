import './storylist.css'
import pic from  '../../assets/homeimg.jpg'
import React,{Component}from 'react';
import {List} from 'antd';
import {Timeline} from 'antd';
import createHistory from 'history/createBrowserHistory';
const history=createHistory({
    forceRefresh:true
});
export default class Storylist extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();

    }
    data=[
        {
            id:0,
            title:"成都",
            subtitle:"从来没有想到自己以后会如此眷恋这个城市",
            content:"this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.",
            starttime:'2013-2-16',
            money:600,
            duration:6,
            cover:'../../assets/homeimg.jpg',
            img:[pic]
        },
        {
            id:1,
            title:"桂林",
            subtitle:"很多一开始说好一起的事，最后都只剩下自己独自前行",
            content:"this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.",
            starttime:'2015-2-16',
            money:1200,
            duration:4,
            cover:'../../assets/homeimg.jpg',
            img:[pic]
        },
        {
            id:2,
            title:"凤凰",
            subtitle:"我还记得捉鸭子大赛的时候，有个女孩会等待那个少年回来",
            content:"this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.this is my first time to visit here and i do not know what to write about.",
            starttime:'2018-2-16',
            money:800,
            duration:3,
            cover:'../../assets/homeimg.jpg',
            img:[pic]
        },
    ]
    getInitialState(){
        return {
            timeline:[
                {id:0,time:'2017-5-5',des:'稻城'},
                {id:1,time:'2016-5-5',des:'桂林'},
                {id:2,time:'2014-1-28',des:'凤凰'},
                {id:3,time:'2012-7-5',des:'成都'},
            ]

        }
    }
    getTimeLines(){
        let lines=this.state.timeline.map((item)=>{
            return <Timeline.Item key={item.id}><a href="#">{item.time} {item.des}</a></Timeline.Item>
        })
        return lines;
    }
    toStoryDetail(id,event){
        history.push(`/story/detail/${id}`,{
            data:this.data[id]
        });
        console.log('ssss')
    }
    render(){
        return(
            <div id="body">
                <div id="list">
                    <List itemLayout="vertical" dataSource={this.data} renderItem={item =>(
                        <List.Item className="item" key={item.id} extra={<img width={200} alt="logo" src={pic} />} onClick={this.toStoryDetail.bind(this,item.id)}>
                            <List.Item.Meta title={item.title} description={item.content}/>
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
