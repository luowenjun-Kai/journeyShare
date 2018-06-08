import './sharelist.css'
import pic from '../../assets/homeimg.jpg'
import React,{Component} from 'react';
import {List,Row,Col} from 'antd';

export default class Sharelist extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
    }
    render(){
        let getItem=function (name) {
            if(name==""){
                return <div  className={"share-img"}>
                    <img></img>
                </div>
            }
            else{
                return <div  className={"share-img"}>
                    <img alt={name} src={pic}></img>
                </div>
            }
        };
        return (
            <div id={"share-img-body"}>
                <List className={"share-img-list"} dataSource={this.props.data} renderItem={item=>(
                    <Col className={"share-img-col"} lg={{span:6}} md={{span:8}} sm={{span:12}} xs={{span:8}}>
                        {getItem(item.name)}
                    </Col>

                )}
                />
            </div>
        )
    }
}
