import React,{Component} from 'react';
import Sharelist from '../../sharelist/sharelist';
import Gapbar from '../../gapbar/gapbar';
export default class SharePage extends Component{
    data=[
        {
        name:"图片1",
        src:""
    },{
        name:"图片2",
        src:""
    },{
        name:"图片2",
        src:""
    },{
        name:"图片2",
        src:""
    },{
        name:"图片2",
        src:""
    },{
        name:"",
        src:""
    },{
        name:"图片2",
        src:""
    },{
        name:"图片2",
        src:""
    }]
    render(){
        const title=<div>AHAI<div style={{fontSize:'10px'}}>hai</div></div>
        return(
            <div>
                <Gapbar title={title} content={""} style={{bkColor:'#fff',titleSize:'15vw'}}/>
                <Gapbar title={"Works"} content={""}/>
                <Sharelist grid={{column:4}} data={this.data}></Sharelist>
            </div>

        )
    }
}
