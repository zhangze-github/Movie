import React, {Component} from "react";
import axios from 'axios';
import {Button } from 'antd-mobile';

axios.defaults.baseURL =    "https://api.isoyu.com";

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:false
        }
    }
    componentWillMount(){
        const _this = this;
        axios.get("/index.php/api/News/new_detail?postid=" + this.props.location.query.id)
            .then(function (response) {
                _this.setState({data: response.data.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    click = () => {
        window.history.back();
    }
    
    render(){
        let {data} = this.state;
        if(data === null){
            return (
                <div>
                    <h1 >无相关资源</h1>
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
                        <div>{data.category}</div>
                        <div>{data.dkeys}</div>
                    </h1>
                        <Button onClick={this.click.bind(null)}>返回</Button>
                </div>
                )
            }else{
                return( <div>无相关资源</div>)
            }
        }else{
            return (<h1 style={{textAlign: 'center', position: 'fixed', top: '45vh', left: '20vw'}}>loading...</h1>)
        }
    }
}