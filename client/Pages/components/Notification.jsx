import React from 'react';
import { browserHistory } from 'react-router';


import Toolbar from '../../../node_modules/material-ui/lib/toolbar/toolbar';
import ToolbarGroup from '../../../node_modules/material-ui/lib/toolbar/toolbar-group';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';

import IconButton from '../../../node_modules/material-ui/lib/icon-button';
import BackIcon from '../../../node_modules/material-ui/lib/svg-icons/navigation/arrow-back';

export default class extends React.Component {

    clear() {
        Meteor.call('clearAllNotifications');
    }

    getNotifications() {
        let notifications = this.props.notifications;

        let topic = (activity) => {
            return (
                <div className="event" key={activity._id} style={{marginBottom: '-50px'}}>
                    <div className="content">
                        <div className="summary">
                            <a onClick={() => {browserHistory.push("/profile/" + activity.from)}}>
                                {(activity.from + " ")}
                            </a>
                            has replied to your <a
                            onClick={() => {browserHistory.push("/forums/topic/" + activity.link)}}>topic</a>
                            <div className="date">{activity.date.toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            );
        };

        let image = (activity) => {
            return (
                <div className="event" key={activity._id} style={{marginBottom: '-50px'}}>
                    <div className="content">
                        <div className="summary">
                            <a onClick={() => {browserHistory.push("/profile/" + activity.from)}}>
                                {(activity.from + " ")}
                            </a>
                            has commented on your <a
                            onClick={() => {browserHistory.push("/gallery/" + activity.link)}}>image</a>
                            <div className="date">{activity.date.toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className="ui small feed" style={{marginTop: '20px'}}>

                {notifications.map((activity) => {
                    if (activity.type === 'image') {
                        return (image(activity));
                    } else {
                        return (topic(activity));
                    }
                })}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup float="left" firstChild={true}>
                        <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon /></IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <RaisedButton label="Clear All" primary={true} onTouchTap={this.clear.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>
                <div className="ui container" style={{marginTop: '15px'}}>
                    <h3 className="ui header centered">Viewing Notifications</h3>
                </div>
                <div className="ui container">
                    {this.getNotifications()}
                </div>
            </div>
        );
    }
}