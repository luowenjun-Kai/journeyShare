import './gapbar.css'
import React,{ Component } from  'react';
import { Row,Col }from 'antd';
export default class Gapbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let title=null,content=null;
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
            let background,titleColor,bkColor,titleSize;
            let bk;
            if(style.hasOwnProperty('background')){
                background=style.background;
                bk={
                    background:`url(${require(`../../assets/${background}.jpg`)}) 0 0 repeat-x`,
                }
            }
            if(style.hasOwnProperty('bkColor')){
                bkColor=style.bkColor;
                bk={
                    backgroundColor:bkColor
                }
            }
            if(style.hasOwnProperty('titleColor')){
                titleColor=style.titleColor;
            }
            if(style.hasOwnProperty('titleSize')){
                titleSize=style.titleSize;
            }
            title=<Row className={'gap-bar'} style={bk}>
                    <Col  span={8} offset={8}>
                        <h1 className="gap-title" style={{color:titleColor,fontSize:titleSize}}>{this.props.title}</h1>
                    </Col>
                </Row>


        }
        //判断有无内容
        if(this.props.hasOwnProperty('content')){
            content=<Row>
                <Col>
                    <div className={"gap-content"} >
                        {this.props.content}
                    </div>
                </Col>
            </Row>
        }
        return (
            <div>
                {title}
                {content}
            </div>
        )
    }
}
