import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Tabs} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import Movie from './Movie/index';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Detail from './Detail.js';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    

    render() {
        return (
                    // <Movie></Movie>
        // <Router history={hashHistory}>
        <Router >
            <Route path="/" component={ Movie } exact></Route>
            <Route path="/details" component={ Detail }></Route>
        </Router>

        );
    }
}

