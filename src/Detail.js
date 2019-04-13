import React, {Component} from "react";
import axios from 'axios';

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
                // _this.setState({movieList: [...this.state.movieList, ...response.data.subjects]})

                // let c = _this.state.movieList.push(...response.data.subjects);
                // console.warn( c)
                // _this.setState({
                //     movieList: [..._this.state.movieList, ...response.data.subjects]
                // })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        console.warn( this.props.location.query.id);
        let {data} = this.state;
        console.warn(data);
        if(data){
            if(data.title){
                return(
                <h1>
                    {data.title}
                    <img src={data.recImgsrc} style={{width: '100vw'}}></img>
                </h1>
                )
            }else{
                return( <div>无相关资源</div>)
            }
        }else{
            return (<div>加载中</div>)
        }


    }
}