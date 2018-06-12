import './home.css'
import React,{Component} from 'react';
//引入所需组件
import Footprint from '../../footprint/footprint';
import Gapbar from '../../gapbar/gapbar'
import { Button } from 'antd'
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
    }
    getInitialState(){
        return {
            destination:''
        }
    }
    setDes(des){
        this.setState({
            destination:des
        });
        console.log("you choose the "+this.state.destination);
    }
    render() {
        const title=<div>旅途<p className={"home-body-des-tips"}>沿途风景变化再辗转，人山人海的对白换一句等待。</p></div>
        const content=function () {
            if(this.state.destination===''){
                return <div className={"home-body-des"}>选择一个你要去的地方</div>
            }
            else{
                return <div className={"home-body-des"}>{this.state.destination}</div>
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
