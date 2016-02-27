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
import ChatIcon from 'material-ui/lib/svg-icons/communication/chat-bubble-outline';

import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userExist: "",
            username: "",
            success: false
        }
    }

    newFriend() {
        this.setState({open: !this.state.open});
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    findUser(event) {
        event.preventDefault();
        let user = this.state.username;
        if (user === Meteor.user().username) {
            this.setState({userExist: 'cannot add yourself!'});
            return;
        }
        Meteor.call('doesUserExist', user, (error, result) => {
            if (error) {
                this.setState({userExist: "submission error, please try again!"});
            } else {
                if (result) {
                    Meteor.call('addFriend', user, (error, result) => {
                        if (error) {
                            this.setState({userExist: "submission error, please try again!"});
                        } else {
                            if (result instanceof Error) {
                                this.setState({userExist: "Already friends!"});
                            } else {
                                this.setState({username: "", success: true, userExist: ""});
                            }
                        }
                    })
                } else {
                    this.setState({userExist: "No such user!"});
                }
            }
        });


    }

    getFriendsList() {

        const chat = (friend) => {
            return (
                <IconButton onTouchTap={()=>{browserHistory.push('/chat/' + friend)}}>
                <ChatIcon />
            </IconButton>
            );
        };


        return (
            <List>
                {this.props.friends.map((friend) => (
                    <ListItem
                        key={friend._id}
                        primaryText={friend.friend}
                        leftAvatar={<Avatar src={"https://api.adorable.io/avatars/175/" + friend.friend + ".png"} />}
                        rightIconButton={chat(friend.friend)}
                        onTouchTap={()=>{
                            setTimeout(
                            function (){browserHistory.push('/profile/' + friend.friend)}
                            , 400)}}
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
                onTouchTap={this.newFriend.bind(this)}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.findUser.bind(this)}
            />
        ];

        const successActions = [
            <FlatButton
                label="Tap here to continue"
                primary={true}
                onTouchTap={() => {this.setState({ success: false })}}
            />
        ];

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup float="left" firstChild={true}>
                        <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon /></IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <RaisedButton label="Add Friend" primary={true} onTouchTap={this.newFriend.bind(this)}/>
                    </ToolbarGroup>
                </Toolbar>

                {this.getFriendsList()}

                <Dialog
                    title="Who do you want to add?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.newFriend.bind(this)}
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

                <Dialog
                    title="Friend added!"
                    modal={false}
                    actions={successActions}
                    open={this.state.success}
                    onRequestClose={() => {this.setState({ success: false })}}
                >
                    Continue
                </Dialog>

            </div>
        );
    }
}