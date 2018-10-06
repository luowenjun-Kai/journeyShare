import React,{ Component } from 'react';
import './gaodeMap.css'
export default class GaodeMap extends Component{
    constructor(props){
        super(props);
        
    }
    paintMap(){
        // 初始化景点坐标
        const AMap = window.AMap
        let map=undefined;
        return ()=>{ 
            if(!map){
                map = new AMap.Map('container',{
                    zoom:this.props.zoom || 11
                })
            }
            let sites = this.props.sites;
            let posArr=[]
            for(let key in sites){
                let marker = new AMap.Marker({
                    position:new AMap.LngLat(sites[key][0],sites[key][1]),
                    title:key
                })
                posArr.push(marker)
            }
            map.add(posArr)
            if(posArr[0]){
                map.setCenter(posArr[0].getPosition())
            }
            
        }
        
    }
    componentDidMount(){
    }
    render(){
        this.paintMap()()
        return (
            <div style={{height:'100%'}}>
                <div id="container"></div>
            </div>
        )
    }
}