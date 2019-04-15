import React, { Component } from 'react';
import {List,  Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import "react-pullload/dist/ReactPullLoad.css";

const Item = List.Item;
const img = {
    float: 'left',
    width: '40%',
    height: '70px',
    overflow: 'hidden',
    position: 'relative',
    marginRight: '0.2rem'
}
const wrapper = {
    fontSize: '14px',
    padding: '0.2rem 0',
    borderBottom: '1px solid #e5e5e5',
    whiteSpace: 'normal'
}

const font = {
    width: '60%',
    position: 'absolulte',
    right: 0
}

export default class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieList : [],
            start: 0,
            loading: false,
            startLoading: true,
            disClick: []
        }
    }

    componentDidMount(){
        console.warn(this.state.disClick)
        const _this=this; 
        axios.get('https://api.isoyu.com/index.php/api/News/new_list?type=2&page=0')
        .then(function (response) {
            _this.setState({movieList: response.data.data,   startLoading: false})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    click = (item) => {
        this.setState({
            start: 0
        })
        const _this = this;
        let url = `https://api.isoyu.com/index.php/api/News/new_list?type=2&page=0`
        axios.get(url)
            .then(function (response) {
                _this.setState({
                    movieList: [...response.data.data],
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleRefresh = () => {
        this.setState({
            start: 0
        })
        const _this = this;
        let url = `https://api.isoyu.com/index.php/api/News/new_list?type=2&page=0`
        axios.get(url)
            .then(function (response) {
                _this.setState({
                    movieList: [...response.data.data],
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loaderMore = () => {
        let start = this.state.start + 10;
        this.setState({
            start,
            loading: true
        })
        const _this = this;
        let url = `https://api.isoyu.com/index.php/api/News/new_list?type=2&page=${start}`
        axios.get(url)
            .then(function (response) {
                let c = _this.state.movieList.push(...response.data.data);
                _this.setState({
                    movieList: [..._this.state.movieList, ...response.data.data],
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        let {movieList} = this.state;
        if(this.state.startLoading){
            return(
                <h1 style={{textAlign: 'center', position: 'fixed', top: '45vh', left: '20vw'}}>loading...</h1>
            )
        }
        return (
            <Row>
          <Col span={24}>
            <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{textAlign: 'center'}}>
                <List renderHeader={() => '娱乐新闻'} style={wrapper} >
                    {   
                        movieList.map((item,index) => {
                            return(
                                
                                <Link to={{pathname: `details`, query : { id: item.postid }}} key={index}>
                                <Item
                                    key={index}
                                    style={{height: 110, whiteSpace: 'normal'}}
                                >
                                    <div style={{whiteSpace: 'normal'}}>
                                    <img style={img} src={item.imgsrc}></img>
                                    {item.title}<br/>
                                    {item.source}
                                    </div>
                                </Item>
                                </Link>
                            )
                        })
                    }
                    <Button loading={this.state.loading} onClick={this.loaderMore.bind(null)}>
                        {
                            this.state.loading ? 
                            "加载中" :
                            "点击加载更多"
                        }
                    </Button>
                </List>
            </ReactPullToRefresh>
            </Col>
        </Row>
        );
    }
}

