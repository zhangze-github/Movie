import React, {
    Component
} from 'react';
import {
    List,
    Button,
    Toast
} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {
    Link
} from 'react-router-dom';
import "react-pullload/dist/ReactPullLoad.css";
import {
    connect
} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';

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


function mapStateToProps(state) {
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAdd: (count) => {
            return dispatch({
                type: 'add',
                payload: [...count]
            })
        },
        onLess: (count) => dispatch({
            type: 'less',
            payload: count
        }),
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            start: 0,
            loading: false,
            startLoading: true,
            disClick: [],
            hasMore: true,
            headLoading: 0
        }
    }

    componentDidMount() {
        const _this = this;
        axios.get('https://api.isoyu.com/index.php/api/News/new_list?type=2&page=0')
            .then(function (response) {
                _this.setState({
                    movieList: response.data.data,
                    startLoading: false
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
                console.warn("刷新成功");
                Toast.info('刷新成功!!!', 1);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loaderMore = () => {
        let start = this.state.start + 10;
        this.setState({
            start,
            loading: true,
            hasMore: false
        })
        const _this = this;
        let url = `https://api.isoyu.com/index.php/api/News/new_list?type=2&page=${start}`
        axios.get(url)
            .then(function (response) {
                let c = _this.state.movieList.push(...response.data.data);
                _this.setState({
                    movieList: [..._this.state.movieList, ...response.data.data],
                    loading: false,
                    hasMore: true
                })
                console.warn("加载成功");
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    itemClick = (index) => {
        let count = [...this.props.count];
        count.push(index);
        this.props.onAdd([...count]);
        setTimeout(() => {
            this.props.onLess(index);
        }, 10000)
    }
    render() {
        let {movieList} = this.state;
        let {count} = this.props;
        if(this.state.startLoading){
            return(
                <h1 style={{textAlign: 'center', position: 'fixed', top: '45vh', left: '20vw'}}>loading...</h1>
            )
        }
        return (
            <div ref={(ref) => this.scrollParentRef = ref}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loaderMore.bind(null)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    getScrollParent={() => this.scrollParentRef}
                >
                    <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{textAlign: 'center'}}>
                        <List renderHeader={() => '娱乐新闻'} style={wrapper} >
                                {   
                                    movieList.map((item,index) => {
                                        if(count.includes(index)){
                                            return(
                                            <Item
                                                key={index}
                                                style={{height: 110, whiteSpace: 'normal'}}
                                                onClick={this.itemClick.bind(null, index)}
                                            >
                                                <div style={{whiteSpace: 'normal', color: '#ddd'}}>
                                                <img style={img} src={item.imgsrc}></img>
                                                {item.title}<br/>
                                                {item.source}
                                                </div>
                                            </Item>
                                            )
                                        }else{
                                            return(
                                            <Link to={{pathname: `details`, query : { id: item.postid }}} key={index}>
                                                <Item
                                                    key={index}
                                                    style={{height: 110, whiteSpace: 'normal'}}
                                                    onClick={this.itemClick.bind(null, index)}
                                                >
                                                    <div style={{whiteSpace: 'normal'}}>
                                                    <img style={img} src={item.imgsrc}></img>
                                                    {item.title}<br/>
                                                    {item.source}
                                                    </div>
                                                </Item>
                                            </Link>
                                            )
                                        }
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
                </InfiniteScroll>
            </div>
        );
    }
}

const Movie = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default Movie;


