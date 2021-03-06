import './homeimg.css'
import url from '../../config';
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
        //处理文章段落
        let article=content.content;
        article=article.replace(/<br>/g,'\n');
        return (
            <div>
                <Row>
                    <Col  lg={{span:13,offset:2}} sm={{span:24}}>
                        <div className="homepic">
                            <Card hoverable cover={<img alt="oops" src={`${url.images}/${content.cover}/${content.journeyId}/5.jpg`} />} onClick={this.props.clickEvent.bind(this)}>
                                <Meta
                                    title={content.destination.split('-')[1]}
                                    description={content.subtitle}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col lg={{span:9}} sm={{span:24}}>
                        <div className="homepic">
                            <h1>{content.title}</h1>
                            <div className={"writer"}>
                                <p>{content.author}</p>
                                <p>{content.createat}</p>
                            </div>

                            <div className="article"><pre className={"article-pre"}>{article}</pre></div>

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
