import React,{ Component } from 'react';
import Homeimg from '../../homeimg/homeimg';
import Storylist from '../../storylist/storylist';
import Gapbar from '../../gapbar/gapbar'
import axios from "axios/index";
import createHistory from 'history/createBrowserHistory'
const history=createHistory({
    forceRefresh:true
});
export default class StoryPage extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();

    }
    componentDidMount(){
        console.log('获取数据');
        axios.get("http://localhost:9095/api/articles").then(res=>{
            let data=res.data;
            let topup=data.shift();
            this.setState({
                topup:topup,
                articles:data
            })
        })
    }
    getInitialState(){
        return {
            topup:{
                title:'你好，世界',
                subtitle:'回新宿的路上',
                cover:'homeimg',
                destination:'富士山',
                content:'hello world',
                author:'Vijay',
                journeyId:''
            },
            articles:[
                {
                    title:'你好，世界',
                    subtitle:'',
                    cover:'homeimg',
                    destination:'',
                    content:'你好，世界',
                    author:'Vijay',
                    journeyId:''
                }
            ]

        }
    }
    toStoryDetail(){
        console.log('hello');
        history.push(`/story/detail/${this.state.topup.journeyId}`,{
            data:this.state.topup
        })
    }
    render(){
        //Storylist无法传递事件，因为消息不能从子传递回父，不知道点击了哪个，所以只能在Storylist里面为每个定义点击事件
        return (
            <div>
                <Homeimg content={this.state.topup} clickEvent={this.toStoryDetail.bind(this)}/>
                <Gapbar title={'往事'} content={""}/>
                <Storylist articles={this.state.articles}/>
            </div>
        )
    }
}
