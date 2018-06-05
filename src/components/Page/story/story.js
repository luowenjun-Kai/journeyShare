import React,{ Component } from 'react';
import Homeimg from '../../homeimg/homeimg';
import Storylist from '../../storylist/storylist';

export default class StoryPage extends Component{
    render(){
        return (
            <div>
                <Homeimg/>
                <Storylist/>
            </div>
        )
    }
}
