import './wave.css'
import React,{Component} from 'react';

export default class Wave extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <div class="box">
                    <p className={"wave-slogan"}>{this.props.slogan}</p>
                    <div className={"wave"}></div>
                    <div className={"wave"}></div>
                    <div className={"wave"}></div>
                </div>
            </div>
        )
    }
}
