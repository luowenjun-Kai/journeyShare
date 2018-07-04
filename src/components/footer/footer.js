import './footer.css'
import React,{Component} from 'react';
import url from '../../config';

export default class Footer extends Component{
    render(){
        return (
            <div>
                <footer>
                    <a href={url.getbeian}>粤ICP备18079336号</a>
                </footer>

            </div>
        )
    }

}
