import React from "react";
import ReactDOM from "react-dom";

import { AppFooter } from "./AppFooter.jsx";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Sticky from 'react-sticky';
import SwipeableViews from 'react-swipeable-views';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import AppBar from 'material-ui/lib/app-bar';


import { Home } from '../Pages/Home.jsx';
import Forums from '../Pages/Forums.jsx';
import Gallery from '../Pages/Gallery.jsx';
import Journal from '../Pages/Journal.jsx';


import { Routes } from "./Routes.jsx";
import { browserHistory } from "react-router";


export class App extends React.Component {
    constructor(props) {
        super(props);
        //set tabIndex to toggle the first tab to open
        let tabIndex = 0;
        let location = this.props.location.pathname;
        (location.indexOf("/forums") !== -1) ? tabIndex = 1 :
            (location.indexOf("/gallery") !== -1) ? tabIndex = 2 :
                (location.indexOf("/journal") !== -1) ? tabIndex = 3 :
                    tabIndex = 0;
        this.state = {
            tabIndex: tabIndex
        }
    }

    handleTabChange(value) {
        this.setState({tabIndex: value});
        switch (value) {
            case 1:
                browserHistory.push("/forums");
                break;
            case 2:
                browserHistory.push("/gallery");
                break;
            case 3:
                browserHistory.push("/journal");
                break;
            default:
                browserHistory.push("/");
                break;
        }
    }

    render() {
        return (
            <div className="app">
                <AppBar title="Tree of Life"/>
                <Sticky>
                    <Tabs onChange={this.handleTabChange.bind(this)} value={this.state.tabIndex}>
                        <Tab label="Home" value={0}></Tab>
                        <Tab label="Forums" value={1}></Tab>
                        <Tab label="Gallery" value={2}></Tab>
                        <Tab label="Journal" value={3}></Tab>
                    </Tabs>
                </Sticky>
                <div className="content">
                    <SwipeableViews index={this.state.tabIndex} onChangeIndex={this.handleTabChange.bind(this)}>
                        <Home />
                        <Forums />
                        <Gallery />
                        <Journal />
                    </SwipeableViews>
                </div>
                <AppFooter />
            </div>
        );
    }

}


//on meteor startup, run the following

Meteor.startup(function () {
    WebFontConfig = {
        google: {families: ['Roboto Slab:400,300,500:latin']}
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
        //console.log("async fonts loaded", WebFontConfig);
    })();

    //ReactDOM.render(<App />, document.getElementById('App'));
    ReactDOM.render(<Routes />, document.getElementById('App'));


});