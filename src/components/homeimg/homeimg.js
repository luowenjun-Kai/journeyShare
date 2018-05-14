import './homeimg.css'
import pic from '../../assets/homeimg.jpg';
import React,{Component} from 'react';
import { Row,Col } from "antd";
import { Card} from "antd";
const { Meta } =Card;

export default class homeimg extends Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span={13} offset={2}>
                        <div className="homepic">
                            <Card hoverable cover={<img alt="example" src={pic} />}>
                                <Meta
                                    title="Europe Street beat"
                                    description="www.instagram.com"
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col span={9}>
                        <div className="homepic">
                            <h1>What We’re Building</h1>
                            <p className="writer">Vijay</p>
                            <p className="article">Today, we’re going to build an interactive tic-tac-toe game.

                                If you like, you can check out the final result here: Final Result. Don’t worry if the code doesn’t make sense to you yet, or if it uses an unfamiliar syntax. We will be learning how to build this game step by step throughout this tutorial.

                                Try playing the game. You can also click on a button in the move list to go “back in time” and see what the board looked like just after that move was made.

                                Once you get a little familiar with the game, feel free to close that tab, as we’ll start from a simpler template in the next sections.</p>

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}