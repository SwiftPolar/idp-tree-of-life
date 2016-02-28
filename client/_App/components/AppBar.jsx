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
        if (this.props.latest) {
            this.state.notifications = <IconButton
                                            onTouchTap={()=>{ browserHistory.push("/notifications") }}>
                                            <YesNotify />
                                        </IconButton>;
        } else {
            this.state.notifications = <IconButton
                                            onTouchTap={()=>{ browserHistory.push("/notifications") }}>
                                            <NoNotify />
                                        </IconButton>;
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.latest) {
            this.setState({notifications: <IconButton onTouchTap={()=>{ browserHistory.push("/notifications") }}><YesNotify /></IconButton>});
        } else {
            this.setState({notifications: <IconButton onTouchTap={()=>{ browserHistory.push("/notifications") }}><NoNotify /></IconButton>});
        }
    }

    render() {
        return (
            <AppBar title="Tree of Life"
                    onLeftIconButtonTouchTap={() => {this.props.openSidebar()}}
                    iconElementRight={this.state.notifications}
            />
        )
    }
}