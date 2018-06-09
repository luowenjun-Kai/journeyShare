import './share.css'
import React,{Component} from 'react';
import Sharelist from '../../sharelist/sharelist';
import Gapbar from '../../gapbar/gapbar';
export default class SharePage extends Component{
    data=[
        {
        name:"1",
        src:""
    },{
        name:"2",
        src:""
    },{
        name:"",
        src:""
    },{
        name:"",
        src:""
    },{
        name:"3",
        src:""
    },{
        name:"4",
        src:""
    },{
        name:"5",
        src:""
    },{
        name:"",
        src:""
    }]
    render(){
        const title=<div>AHAI<div style={{fontSize:'10px'}}>虚心接受，坚决不改</div></div>
        return(
            <div className={'share-bk'}>
                <Gapbar  title={title} style={{background:'bk',titleSize:'15vw',titleColor:'#fff'}}/>
                <Gapbar title={"Works"} style={{bkColor:'#fff'}}/>
                <Sharelist  grid={{column:4}} data={this.data}></Sharelist>
            </div>

        )
    }
}
