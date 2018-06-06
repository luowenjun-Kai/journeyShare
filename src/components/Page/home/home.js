import './home.css'
import React,{Component} from 'react';
//引入所需组件
import Footprint from '../../footprint/footprint';
import Gapbar from '../../gapbar/gapbar'
export default class HomePage extends Component{
    gapbar=[
        {
            title:'About',
            content:'Hello guys welcome to my website,Hello guys welcome to my website,Hello guys welcome to my website,Hello guys welcome to my website,Hello guys welcome to my website,Hello guys welcome to my website,Hello guys welcome to my website'
        },
        {
            title:'Music',
            content:'some music will be show '
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
