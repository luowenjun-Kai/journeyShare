import './homeimg.css'
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col } from "antd";
import { Card} from "antd";
import createHistory from 'history/createBrowserHistory'
const { Meta } =Card;
const history=createHistory({
    forceRefresh:true
});
export default class homeimg extends Component{
    data={
        card_title:'富士山',
        card_description:'回新宿的路上',
        id:20180121,
        title:"日本",
        subtitle:"",
        content:" ",
        starttime:'2018-2-16',
        money:800,
        duration:3,
        cover:'riben',
    }
    toStoryDetail(){
        history.push(`/story/detail/${this.data.id}`,{
            data:this.data
        })
    }
    render(){
        return (
            <div>
                <Row>
                    <Col  lg={{span:13,offset:2}} sm={{span:24}}>
                        <div className="homepic">
                            <Card hoverable cover={<img alt="example" src={pic} />} onClick={this.toStoryDetail.bind(this)}>
                                <Meta
                                    title={this.data.card_title}
                                    description={this.data.card_description}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col lg={{span:9}} sm={{span:24}}>
                        <div className="homepic">
                            <h1>{this.data.title}</h1>
                            <p className="writer">Vijay</p>
                            <p className="article">{this.data.content}</p>

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
