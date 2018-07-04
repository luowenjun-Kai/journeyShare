import './footprint.css';
import  React,{ Component } from 'react';
import ReactEcharts from 'echarts-for-react';
require('echarts/map/js/china.js');
export  default class Footprint extends Component{
    constructor(props){
        super(props);
        this.state=this.getInitialState();
        this.choose=this.choose.bind(this);
    }
    getInitialState(){
        return {
            option:this.getOption(),

        }
    }
    provinces=[
        {"name":"新疆","cp":[84.9023,41.748],value:0},
        {"name":"西藏","cp":[88.7695,31.6846],value:0},
        {"name":"内蒙古","cp":[117.5977,44.3408],value:0},
        {"name":"青海","cp":[96.2402,35.4199],value:0},
        {"name":"四川","cp":[102.9199,30.1904],value:5},
        {"name":"黑龙江","cp":[128.1445,48.5156],value:0},
        {"name":"甘肃","cp":[95.7129,40.166],value:0},
        {"name":"云南","cp":[101.8652,25.1807],value:0},
        {"name":"广西","cp":[108.2813,23.6426],value:2},
        {"name":"湖南","cp":[111.5332,27.3779],value:1},
        {"name":"陕西","cp":[109.5996,35.6396],value:0},
        {"name":"广东","cp":[113.4668,22.8076],value:2},
        {"name":"吉林","cp":[126.4746,43.5938],value:0},
        {"name":"河北","cp":[115.4004,37.9688],value:0},
        {"name":"湖北","cp":[112.2363,31.1572],value:0},
        {"name":"贵州","cp":[106.6113,26.9385],value:0},
        {"name":"山东","cp":[118.7402,36.4307],value:0},
        {"name":"江西","cp":[116.0156,27.29],value:0},
        {"name":"河南","cp":[113.4668,33.8818],value:0},
        {"name":"辽宁","cp":[122.3438,41.0889],value:0},
        {"name":"山西","cp":[112.4121,37.6611],value:0},
        {"name":"安徽","cp":[117.2461,32.0361],value:0},
        {"name":"福建","cp":[118.3008,25.9277],value:2},
        {"name":"浙江","cp":[120.498,29.0918],value:0},
        {"name":"江苏","cp":[120.0586,32.915],value:0},
        {"name":"重庆","cp":[107.7539,30.1904],value:10},
        {"name":"宁夏","cp":[105.9961,37.3096],value:0},
        {"name":"海南","cp":[109.9512,19.2041],value:0},
        {"name":"台湾","cp":[121.0254,23.5986],value:0},
        {"name":"北京","cp":[116.4551,40.2539],value:0},
        {"name":"天津","cp":[117.4219,39.4189],value:0},
        {"name":"上海","cp":[121.4648,31.2891],value:0},
        {"name":"香港","cp":[114.2578,22.3242],value:1},
        {"name":"澳门","cp":[113.5547,22.1484],value:0}
    ]
    getOption() {
        return {
            visualMap: {
                min: 0,
                max: 10,
                left: 'left',
                top: 'bottom',
                inRange: {
                    color: ['#fff','#6c848d']
                },
                show:false
            },
            series:[{
                name:'china',
                type: 'map',
                mapType: 'china',
                roam: true,
                zoom:1,
                scaleLimit:{
                    min:1,
                    max:5
                },
                label:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:true
                    }

                },
                itemStyle:{
                    areaColor:'#f1f1f1',

                },
                emphasis:{
                    itemStyle:{
                        areaColor:'#80989b'
                    }

                },
                data:this.provinces,
            }
            ]
        }
    }
    choose(event){
        //console.log(event);
        let des=event.data.name;
        this.props.setDes(des);
        this.setState({
            option:{
                series:[{
                    zoom:4,
                    center:event.data.cp
                }]
            }
        })

    }

    render(){
        let onEvents={
            'click':this.choose
        }
        return (
            <div>
                <ReactEcharts option={this.state.option} onEvents={onEvents}/>
            </div>
        )
    }
}
