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
import Avatar from 'material-ui/lib/avatar';

import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userExist: "",
            username: ""
        }
    }

    newChat() {
        this.setState({open: !this.state.open});
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    findUser(event) {
        event.preventDefault();
        let user = this.state.username;
        Meteor.call('doesUserExist', user, (error, result) => {
            if (error) {
                this.setState({userExist: "submission error, please try again!"});
            } else {
                if (result) {
                    browserHistory.push('/chat/' + user);
                } else {
                    this.setState({userExist: "No such user!"});
                }
            }
        });


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
                        leftAvatar={<Avatar src={"https://api.adorable.io/avatars/175/" + getAuthor(msg.from, msg.to) + ".png"} />}
                        secondaryText={msg.message}
                        secondaryTextLines={2}
                        onTouchTap={()=>{
                            setTimeout(
                            function (){browserHistory.push('/chat/' + getAuthor(msg.from, msg.to))}
                            , 350)}}
                    />
                ))}
            </List>
        );
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.newChat.bind(this)}
            />,
            <FlatButton
                label="Find"
                primary={true}
                onTouchTap={this.findUser.bind(this)}
            />
        ];
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

                <Dialog
                    title="Who do you want to chat with?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.newChat.bind(this)}
                >
                    <TextField
                        fullWidth={true}
                        hintText="Username"
                        errorText={this.state.userExist}
                        value={this.state.username}
                        onChange={this.handleUserChange.bind(this)}
                        onEnterKeyDown={this.findUser.bind(this)}
                    />

                </Dialog>

            </div>
        );
    }
}