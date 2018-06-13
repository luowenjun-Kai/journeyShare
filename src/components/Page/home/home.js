import './home.css'
import React,{Component} from 'react';
//引入所需组件
import Footprint from '../../footprint/footprint';
import Gapbar from '../../gapbar/gapbar';
import Deslist from '../../deslist/deslist';
import { Button } from 'antd'
import axios from 'axios';
import url from '../../../config';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
    }
    getInitialState(){
        return {
            destination:'',
            rawdesdata:'',
        }
    }
    setDes(des){
        let cdes=this.state.destination;
        console.log("you choose the "+des);
        //根据des索引其下的目的地
        axios.get(url.getJneyByDes + des).then((res)=>{
            let data=res.data;
           // console.log(data)
            let showdata=[];
            //处理数据传入组件
            for(let i in data){
                let desarr=data[i].destination.split('-');
                let temp={
                    journeyId:data[i].journeyId,
                    time:new Date(data[i].deptime).toLocaleDateString(),
                    des:desarr[1],
                    cover:desarr[2]
                }
                showdata.push(temp)
            }
             this.setState({
                 destination:showdata,
                 rawdesdata:data
             })

        })


    }
    render() {
        const title=<div>旅途<p className={"home-body-des-tips"}>沿途风景如歌变化再辗转，人山人海的对白换一句等待。</p></div>
        const content=function () {
            if(this.state.destination===''){
                return <div className={"home-body-des"}>选择一个你要去的地方</div>
            }
            else{
                let des=this.state.destination;
                return <div className={"home-body-des"}><Deslist data={des}/></div>
            }
        }
        return (
            <div className={"home"}>
                <div className={"home-fp"}>
                    <Footprint setDes={this.setDes.bind(this)}></Footprint>
                    <Button className="dep">出发</Button>
                </div>
                <div id={"home-body-wrap"}>
                    <div id={'home-body'}>
                        <Gapbar title={title} content={content.apply(this)} style={{titleColor:'#333631',bkColor:'#6c848d'}}/>
                    </div>

                </div>

            </div>
        )

    }
}
