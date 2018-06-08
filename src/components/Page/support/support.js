import oops from '../../../assets/oops.png'
import React,{ Component} from 'react';
import Gapbar from '../../gapbar/gapbar';
export default class SupportPage extends Component{
    render(){
        //以下为暂时性页面
        const content=<div style={{textAlign:'center'}}><img alt={"oops"} src={oops}></img></div>
        return(
            <div>
                <Gapbar title={"敬请期待"} content={content} style={{bkColor:'#fff',titleSize:'15vw'}}/>
            </div>
        )
    }
}
