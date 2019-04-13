import React, { Component } from 'react';
import {List, PullToRefresh, ListView, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { Row, Col } from 'antd';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import Tloader from 'react-touch-loader';
import {Router,Route,hashHistory} from 'react-router';
import {Link} from 'react-router-dom';

const Item = List.Item;
const Brief = Item.Brief;

export default class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieList : [],
            start: 0
        }
    }

    componentDidMount(){
        const _this=this; 
        // axios.get('https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=0&count=9')
        let url = "https://bird.ioliu.cn/v1?url=" + 'https://api.douban.com/v2/movie/in_theaters?start=0&count=10'
        axios.get(url)
        .then(function (response) {
            console.log(response);
            _this.setState({movieList: response.data.subjects})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    click = (item) => {
        console.warn(123);
        const _this=this; 
        axios.get('https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=0&count=9')
        // let url = "https://bird.ioliu.cn/v1?url=" + 'https://api.douban.com/v2/movie/in_theaters?start=0&count=10'
        // axios.get(url)
        .then(function (response) {
            console.log(response);
            _this.setState({movieList: [..._this.state.movieList, ...response.data.subjects]})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleRefresh = () => {
        console.warn('test');
    }

    loaderMore = () => {
        let start = this.state.start + 10;
        this.setState({
            start
        })
        const _this = this;
        console.warn(start)
        let url = `https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=${start}&count=10`
        axios.get(url)
            .then(function (response) {
                console.log(response);
                // _this.setState({movieList: [...this.state.movieList, ...response.data.subjects]})

                let c = _this.state.movieList.push(...response.data.subjects);
                console.warn( c)
                _this.setState({
                    movieList: [..._this.state.movieList, ...response.data.subjects]
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        console.warn(this.state.movieList);
        let {movieList} = this.state;
        return (
            <Row>
          <Col span={24}>
         
            <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{textAlign: 'center'}}>
                <List renderHeader={() => '电影'} className="my-list">
                    {/* <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        Title <Brief>subtitle</Brief>
                    </Item> */}
                    {   
                        movieList.map((item,index) => {
                            return(
                                <Link to={{pathname: `details`, query : { id: item.id }}} key={index}>
                                <Item
                                    key={index}
                                    // style={{height: 110}}
                                    // onClick={this.click.bind(null,item)}
                                >
                                    
                                    <img style={{width: 141, height: 200}} src={item.images.small}></img>
                                    <span>{item.title}</span>
                                </Item>
                                </Link>
                            )
                        })
                    }
                    <Button onClick={this.loaderMore.bind(null)}>点击加载更多</Button>
                </List>
            </ReactPullToRefresh>
            {/* </ReactIScroll> */}
            </Col>
        </Row>
        );
    }
}

// import React, { Component } from 'react';
// import { PullToRefresh, ListView, Button, List } from 'antd-mobile';
// import ReactDOM from 'react-dom';
// import axios from 'axios';

// const Item = List.Item;
// const Brief = Item.Brief;

// const data = [{
//         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//         title: 'Meet hotel',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//         title: 'McDonald\'s invites you',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//         title: 'Eat the week',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
// ];
// const NUM_ROWS = 20;
// let pageIndex = 0;

// function genData(pIndex = 0) {
//     const dataArr = [];
//     for (let i = 0; i < NUM_ROWS; i++) {
//         dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
//     }
//     return dataArr;
// }

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         const dataSource = new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1 !== row2,
//         });

//         this.state = {
//             dataSource,
//             refreshing: true,
//             isLoading: true,
//             height: document.documentElement.clientHeight,
//             useBodyScroll: true,
//             movieList: [],
//             start: 0
//         };
//     }

//     componentDidUpdate() {
//         if (this.state.useBodyScroll) {
//             document.body.style.overflow = 'auto';
//         } else {
//             document.body.style.overflow = 'hidden';
//         }
//     }

//     componentDidMount() {
//         const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

//         setTimeout(() => {
//             this.rData = genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(genData()),
//                 height: hei,
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 1500);
//         const _this = this;
//         axios.get('https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=0&count=9')
//         // let url = "https://bird.ioliu.cn/v1?url=" + 'https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=0&count=10'
//         // axios.get(url)
//             .then(function (response) {
//                 console.log(response);
//                 _this.setState({
//                     movieList: response.data.subjects
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });

//     }

//     onRefresh = () => {
//         let start = this.state.start + 10;
//         // console.warn('refresh')
//         this.setState({
//             start
//         })
//         this.setState({
//             refreshing: true,
//             isLoading: true
//         });
//         // simulate initial Ajax
//         // setTimeout(() => {
//         //   this.rData = genData();
//         //   this.setState({
//         //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
//         //     refreshing: false,
//         //     isLoading: false,
//         //   });
//         // }, 600);
//         const _this = this;
//         let url = `https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=${start}&count=9`
//         axios.get(url)
//             .then(function (response) {
//                 console.log(response);
//                 // _this.setState({movieList: [...this.state.movieList, ...response.data.subjects]})

//                 let c = _this.state.movieList.push(...response.data.subjects);
//                 console.warn( c)
//                 _this.setState({
//                     movieList: c
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };

//     onEndReached = (event) => {
//         let start = this.state.start + 10;
//         this.setState({
//             start
//         })
//         const _this = this;
//         let url = `https://api.isoyu.com/index.php/api//Movie/playing_movie_list?start=${start}&count=10`
//         axios.get(url)
//             .then(function (response) {
//                 console.log(response);

//                 let c = _this.state.movieList.push(...response.data.subjects);
//                 _this.setState({
//                     movieList: [..._this.state.movieList, ...response.data.subjects]
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });


//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         // console.log('reach end', event);
//         this.setState({
//             isLoading: true
//         });
//         setTimeout(() => {
//             this.rData = [...this.rData, ...genData(++pageIndex)];
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 isLoading: false,
//             });
//         }, 1000);
//     };

//   render() {
//       console.warn(this.state.dataSource);
//       const {movieList} = this.state;
//     const separator = (sectionID, rowID) => (
//       <div
//         key={`${sectionID}-${rowID}`}
//         style={{
//           backgroundColor: '#F5F5F9',
//           height: 8,
//           borderTop: '1px solid #ECECED',
//           borderBottom: '1px solid #ECECED',
//         }}
//       />
//     );
//     let index = data.length - 1;
//     const row = (rowData, sectionID, rowID) => {
//         console.warn(movieList)
//       if (index < 0) {
//         index = data.length - 1;
//       }
//       const obj = data[index--];
//       return (
//         //   <Item >
            
//         //   </Item>
//         <div key={rowID}
//           style={{
//             padding: '0 15px',
//             backgroundColor: 'white',
//           }}
//         >
//           <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
//             {obj.title}
//           </div>
//           <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
//             <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
//             <div style={{ display: 'inline-block' }}>
//               <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
//               <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
//             </div>
//           </div>
//         </div>
//       );
//     };
//     return (
//         <div>
//             <ListView
//                 key={this.state.useBodyScroll ? '0' : '1'}
//                 ref={el => this.lv = el}
//                 dataSource={this.state.dataSource}
//                 renderHeader={() => <span>Pull to refresh</span>}
//                 renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//                         {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                     </div>)}
//                 renderRow={row}
//                 // renderSeparator={separator}
//                 useBodyScroll={this.state.useBodyScroll}
//                 style={this.state.useBodyScroll ? {} : {
//                         height: this.state.height,
//                         border: '1px solid #ddd',
//                         margin: '5px 0',
//                     }}
//                 pullToRefresh={<PullToRefresh
//                         refreshing={this.state.refreshing}
//                         onRefresh={this.onRefresh}
//                     />}
//                 onEndReached={this.onEndReached}
//                 pageSize={5}
//             />
//         </div>);
//   }
// }