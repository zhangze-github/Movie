// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from "react-redux";
import {deepClone} from 'lodash';
import thunk from 'redux-thunk'

function counter(state = { count: [] }, action) {
    const count = state.count;
    console.warn("update")
    switch (action.type) {
        case 'add':
            console.warn(action);
            return { count: [...action.payload]}
        case "less": 
            // let index = action.payload.indexOf(count);
            // count = count.splice(index, 1)
            let data = count.filter(item => item !== action.payload)
            return{ count: data }
        default:
            return state
    }
}
const store = createStore(counter,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>  
        <App></App>,
    </Provider>,
    document.getElementById('root')
);

//  import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// //与 redux 配合使用的 react-redux 提供了 props 绑定的语法糖
// import { Provider, connect } from 'react-redux'; 

// // Reducer  是一个方法 返回 store 中的 data 传入两个参数 一个是状态默认值 一个是发出的action的对象
// function counter(state = { count: 0 }, action) {
//     const count = state.count;
//     switch (action.type) {
//         case 'add':
//             return { count: count + 1}
//         case "less": 
//             return{ count : count -1}
//         default:
//             return state
//     }
// }

// //  见名知意 将 state 映射到 props
// function mapStateToProps(state) {
//     return {
//         value: state.count
//     }
// }

// // 见名知意 将 fun 映射到 props
// function mapDispatchToProps(dispatch) {
//     return {
//         onAdd: () => dispatch({ type: 'add' }),
//         onLess: () => dispatch({ type: 'less' }),
//     }
// }

// // connect 将 data 和 fun 都绑定到组件 通过 props 访问
// class Counter extends Component {
//     render() {
//         const {value, onAdd, onLess} = this.props;
//         return (
//             <div>
//                 <div>{value}</div>
//                 <button onClick={onAdd}>add</button><br/>
//                 <button onClick={onLess}>less</button>
//             </div>
//         )
//     }
// }

// const App = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Counter)

// // Store  将reducer结合成store
// const store = createStore(counter);

// ReactDOM.render(
//     // Provider组件 将store绑定到根组件
//     <Provider store={store}>  
//         <App />
//     </Provider>,
//     document.getElementById('root')
// )