import './gapbar.css'
import React,{ Component } from  'react';
import { Row,Col }from 'antd';
export default class Gapbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let title=null;
        let style=this.props.style;
        if(style===undefined){
            title=<Row className={'gap-bar'}>
                <Col  span={8} offset={8}>
                    <h1 className="gap-title">{this.props.title}</h1>
                </Col>
            </Row>
        }
        else{
            //检查style中有哪些值
            let background,titleColor;
            if(style.hasOwnProperty('background')){
                background=style.background;
            }
            if(style.hasOwnProperty('titleColor')){
                titleColor=style.titleColor;
            }
            let img={
                background:`url(${require(`../../assets/${background}.jpg`)}) 0 0 repeat-x`,
            }
            title=<Row className={'gap-bar'} style={img}>
                <Col  span={8} offset={8}>
                    <h1 className="gap-title" style={{color:titleColor}}>{this.props.title}</h1>
                </Col>
            </Row>
        }
        return (
            <div>
                {title}
                <Row>
                    <Col>
                        <div className={"gap-content"} >
                            {this.props.content}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
