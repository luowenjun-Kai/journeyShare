import './story.css'
import pic from  '../../assets/homeimg.jpg'
import React,{Component}from 'react';
import {List} from 'antd';
export default class Story extends Component{

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
                        <List.Item extra={<img width={272} alt="logo" src={pic} />}>
                            <List.Item.Meta title={item.title} description={item.describe}/>
                        </List.Item>
                    )}

                    />
                </div>
                <div id='aside'>
                    here I want to put some thing
                </div>
            </div>
        )
    }
}