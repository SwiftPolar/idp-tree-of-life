import React from "react";
import ReactDOM from "react-dom";

import { AppFooter } from "./AppFooter.jsx";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Sticky from 'react-sticky';
import Swipeable from 'react-swipeable';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import AppBar from './containers/AppBar';

import IconButton from 'material-ui/lib/icon-button';
import NoNotify from 'material-ui/lib/svg-icons/social/notifications-none';
import YesNotify from 'material-ui/lib/svg-icons/social/notifications';


import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';


import Home from '../Pages/containers/Home.js';
import Forums from '../Forums/containers/Forums.js';
import Gallery from '../Gallery/containers/Gallery.js';
import Journal from '../Journal/containers/Journal.js';


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
            tabIndex: tabIndex,
            sidebar: false,
            transform: 'translateX(0px)',
            delta: 0
        };
    }

    handleTabChange(value) {
        if (this.state.sidebar) return;

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

    sidebar() {
        this.setState({sidebar: !sidebar});
    };

    swipingRight(event, delta) {
        this.setState({
            transform: 'translateX(' + delta + 'px)',
            delta: delta
        });
    }

    swipingLeft(event, delta) {
        this.setState({
            transform: 'translateX(-' + delta + 'px)',
            delta: -delta
        });

    }

    handleTouchEnd(event) {
        if (this.state.delta != 0) {

            let tabIndex = this.state.tabIndex;
            if (this.state.delta > 140) {
                tabIndex--;
                if (tabIndex < 0) tabIndex++;
            } else if (this.state.delta < -140) {
                tabIndex++;
                if (tabIndex > 3) tabIndex--;
            }
            this.setState({
                transform: 'translateX(0px)',
                delta: 0
            });


            this.handleTabChange(tabIndex);
        }
    }

    openSidebar() {
        this.setState({sidebar: !this.state.sidebar})
    }

    render() {
        return (
            <div className="app">
                <AppBar openSidebar={this.openSidebar.bind(this)}/>
                <Sticky>
                    <Tabs onChange={this.handleTabChange.bind(this)} value={this.state.tabIndex}>
                        <Tab label="Home" value={0}></Tab>
                        <Tab label="Forums" value={1}></Tab>
                        <Tab label="Gallery" value={2}></Tab>
                        <Tab label="Journal" value={3}></Tab>
                    </Tabs>
                </Sticky>
                <Swipeable
                    onSwipingRight={this.swipingRight.bind(this)}
                    onSwipingLeft={this.swipingLeft.bind(this)}
                >
                    <div className="content" style={{transform: this.state.transform}}
                         onTouchEnd={this.handleTouchEnd.bind(this)}>
                        {this.props.children}
                    </div>
                </Swipeable>
                <AppFooter />
                <LeftNav
                    docked={false}
                    width={200}
                    open={this.state.sidebar}
                    onRequestChange={open => this.setState({sidebar: open})}
                >
                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/profile/' + Meteor.user().username);
                            this.setState({sidebar: false});
                        }}
                    >
                        My Profile
                    </MenuItem>

                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/friends');
                            this.setState({sidebar: false});
                        }}
                    >
                        My Friends
                    </MenuItem>

                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/chat');
                            this.setState({sidebar: false});
                        }}
                    >
                        My Chat
                    </MenuItem>

                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/forums/user/' + Meteor.user().username);
                            this.setState({sidebar: false});
                        }}
                    >
                        My Topics
                    </MenuItem>

                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/notifications');
                            this.setState({sidebar: false});
                        }}
                    >
                        My Notifications
                    </MenuItem>

                    <MenuItem
                        onClick={()=>{
                            browserHistory.push('/settings');
                            this.setState({sidebar: false});
                        }}
                    >
                        My Settings
                    </MenuItem>

                    <MenuItem>Import Media</MenuItem>

                    <MenuItem
                        onClick={()=>{
                            Meteor.logout(function () {
                                browserHistory.push('/login');
                            });

                        }}
                    >
                        Log Out
                    </MenuItem>
                </LeftNav>
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