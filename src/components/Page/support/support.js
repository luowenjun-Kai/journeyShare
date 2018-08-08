import './support.css'
import oops from '../../../assets/oops.png'
import React,{ Component} from 'react';
import Gapbar from '../../gapbar/gapbar';
import Wave from '../../wave/wave';
export default class SupportPage extends Component{
    render(){
        //以下为暂时性页面
        const content=<div style={{textAlign:'center'}}><Wave slogan={"敬请期待"}/></div>
        const title=<div>
            <p className={"slogan"}>"永远相信美好的事情即将发生"</p>
        </div>
        return(
            <div>
                <Gapbar title={content}  style={{bkColor:'#fff'}}/>
            </div>
        )
    }
}
