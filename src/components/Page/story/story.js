import React,{ Component } from 'react';
import Homeimg from '../../homeimg/homeimg';
import Storylist from '../../storylist/storylist';
import Gapbar from '../../gapbar/gapbar'
export default class StoryPage extends Component{
    render(){
        return (
            <div>
                <Homeimg/>
                <Gapbar title={'往事'} content={""}/>
                <Storylist/>
            </div>
        )
    }
}
