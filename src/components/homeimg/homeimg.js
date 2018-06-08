import './homeimg.css'
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col } from "antd";
import { Card} from "antd";
const { Meta } =Card;
export default class homeimg extends Component{
    constructor(props){
        super(props);

    }
    render(){
        const content=this.props.content;
        return (
            <div>
                <Row>
                    <Col  lg={{span:13,offset:2}} sm={{span:24}}>
                        <div className="homepic">
                            <Card hoverable cover={<img alt="example" src={pic} />} onClick={this.props.clickEvent.bind(this)}>
                                <Meta
                                    title={content.destination}
                                    description={content.subtitle}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col lg={{span:9}} sm={{span:24}}>
                        <div className="homepic">
                            <h1>{content.title}</h1>
                            <p className="writer">Vijay</p>
                            <p className="article">{content.content}</p>

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
