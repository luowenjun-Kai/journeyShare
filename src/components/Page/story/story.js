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
                subtitle:'摄于从镰仓回新宿的路上',
                cover:'homeimg',
                destination:'富士山',
                content:'富士山一开始并不在我们的行程上，虽然在六本木上面错过了一次，但也未曾觉得遗憾。但从片赖江之岛回来的电车上见到它，就在海的对面静静伫立，任由夕阳在它身上洒下恋人般温暖的霞光，心里也有些许震撼。',
                author:'Vijay',
                journeyId:''
            },
            articles:[
                {
                    title:'汪洋大海，孑然一身',
                    subtitle:'',
                    cover:'static2',
                    destination:'',
                    content:'如果有一首歌能够让我回到过去的一个点，那自然是这首迪克兰的Sailing。任何时候，只要闭上眼，歌声里的船就会把我带回到高三周末的一个下午，午睡中听到学校的起床铃，I\'m Sailing I\'m Sailing 孤独而又悠长',
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
