import './home.css'
import React,{Component} from 'react';
//引入所需组件
import Footprint from '../../footprint/footprint';
import Gapbar from '../../gapbar/gapbar'
export default class HomePage extends Component{
    gapbar=[
        {
            title:'关于',
            content:'其实很早我就想自己设立一个网站，不是别人给的，是真正属于自己的地方，嗯，就像小时候每个人都有自己的秘密基地一样，这里就是我的秘密基地，所以，欢迎光临。这个项目前后大概花了我一个月的时间吧，从网站排版布局到文案，全部都是我一字一字打出来的。现在终于可以发布第一个版本，心里还是很激动的。如你所见，它现在并不完美，但一点也不耽误它逐渐变好，就像我们一样，每个东西都有他成长的过程，所以，多多包涵啦。嗯，玩的开心！'
        },
        {
            title:'也许',
            content:'主页投放的内容暂时没有想好啊，有好的建议可以给我说哦！'
        }
    ]
    render() {
        return (
            <div>
                <Footprint></Footprint>
                <div id={"home-body-wrap"}>
                    <div id={'home-body'}>
                        <Gapbar title={this.gapbar[0].title} content={this.gapbar[0].content} style={{background:'gapbarbk',titleColor:'#333631'}}/>
                        <Gapbar title={this.gapbar[1].title} content={this.gapbar[1].content}/>
                    </div>

                </div>

            </div>
        )

    }
}
