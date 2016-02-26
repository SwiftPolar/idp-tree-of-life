import React from 'react';
import { browserHistory } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export default class extends React.Component {

    newChat() {
        console.log("START NEW CHAT!");
    }

    getMessageList() {
        const getAuthor = (from, to) => {
            if (from === Meteor.user().username) return to;
            return from;
        };

        return (
            <List>
                {this.props.messages.map((msg) => (
                        <ListItem
                            key={msg._id}
                            primaryText={getAuthor(msg.from, msg.to)}
                            secondaryText={msg.message}
                            secondaryTextLines={2}
                            onTouchTap={()=>{
                            setTimeout(
                            function (){browserHistory.push('/chat/' + getAuthor(msg.from, msg.to))}
                            , 500)}}
                        />
                ))}
            </List>
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
                        <RaisedButton label="New Chat" primary={true} onTouchTap={this.newChat.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                {this.getMessageList()}
            </div>
        );
    }
}