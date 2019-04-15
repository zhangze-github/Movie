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
    switch (action.type) {
        case 'add':
            return { count: [...action.payload]}
        case "less": 
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
