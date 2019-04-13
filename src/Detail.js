import React, {Component} from "react";
import axios from 'axios';


export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        // let start = this.state.start + 10;
        // this.setState({
        //     start
        // })
        const _this = this;
        // console.warn(start)
        let url ="https://bird.ioliu.cn/v1?url=" +  `https://api.isoyu.com/index.php/api/api/Movie/movie_info?id=${this.props.location.query.id}`
        axios.get(url)
            .then(function (response) {
                console.log(response);
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
        return(

                <h1>tese</h1>

            
        )
    }
}