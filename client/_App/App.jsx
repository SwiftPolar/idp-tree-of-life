import React from "react";
import ReactDOM from "react-dom";

import { AppHeader } from "./AppHeader/AppHeader.jsx";

import { Routes } from "./Routes.jsx";
import { browserHistory } from "react-router";


export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppHeader />
                {this.props.children}
            </div>
        );
    }

}


//on meteor startup, run the following

Meteor.startup(function () {
    //ReactDOM.render(<App />, document.getElementById('App'));
    ReactDOM.render(<Routes />, document.getElementById('App'));
});