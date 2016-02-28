import React from "react";
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/lib/app-bar';

import IconButton from 'material-ui/lib/icon-button';
import NoNotify from 'material-ui/lib/svg-icons/social/notifications-none';
import YesNotify from 'material-ui/lib/svg-icons/social/notifications';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        if(this.props.latest) {
            this.state.notifications = <IconButton><YesNotify /></IconButton>;
        } else {
            this.state.notifications = <IconButton><NoNotify /></IconButton>
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.latest) {
            this.setState({notifications: <IconButton><YesNotify /></IconButton>});
        } else {
            this.setState({notifications: <IconButton><NoNotify /></IconButton>});
        }
    }

    render() {
        return (
            <AppBar title="Tree of Life"
                    onLeftIconButtonTouchTap={() => {this.props.openSidebar()}}
                    onRightIconButtonTouchTap={()=>{ browserHistory.push("/notifications") }}
                    iconElementRight={this.state.notifications}
            />
        )
    }
}