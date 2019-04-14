import React, {Component} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {List, PullToRefresh, ListView, Button } from 'antd-mobile';

axios.defaults.baseURL =    "https://api.isoyu.com";

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:false
        }
    }
    componentWillMount(){
        // let start = this.state.start + 10;
        // this.setState({
        //     start
        // })
        const _this = this;
        // console.warn(start)
        // let url ="https://bird.ioliu.cn/v1?url=" +  `https://api.isoyu.com/index.php/api/api/Movie/movie_info?id=${this.props.location.query.id}`
        let url = `https//api.isoyu.com/index.php/api/News/new_detail?postid=${this.props.location.query.id}`
        axios.get("/index.php/api/News/new_detail?postid=" + this.props.location.query.id)
            .then(function (response) {
                console.log(response);
                _this.setState({data: response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    click = () => {
        window.location.href = '/'
    }
    render(){
        console.warn( this.props.location.query.id);
        let {data} = this.state;
        console.warn(data);
        if(data === null){
            return (
                <div>
                    <h3>无相关资源</h3>
                    <Button onClick={this.click.bind(null)}>返回</Button>
                </div>
            )
        }
        if(data){
            if(data.title){
                return(
                <div>
                    <h1>
                        {data.title}
                        <img src={data.recImgsrc} style={{width: '100vw'}}></img>
                    </h1>
                    {/* <Link to={'/'} > */}
                        <Button onClick={this.click.bind(null)}>返回</Button>
                    {/* </Link> */}
                </div>
                )
            }else{
                return( <div>无相关资源</div>)
            }
        }else{
            return (<div>加载中</div>)
        }


    }
}