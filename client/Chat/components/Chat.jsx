import React from 'react';
import { browserHistory } from 'react-router';

import Footer from '../ChatFooter.jsx';

import Sticky from 'react-sticky';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import Avatar from 'material-ui/lib/avatar';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

import IconButton from 'material-ui/lib/icon-button';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';


import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/add-a-photo';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    clear() {
        console.log("CLEARING MESSAGES!");
    }

    submit(event) {
        event.preventDefault();
        let text = this.state.text;
        if (text !== "") {
            Meteor.call('submitMessage', this.props.username, text, (error, result) => {
                if (error) {
                    console.log('CHAT ERROR');
                }
            });
        }
        this.setState({text: ""});
    }

    change(event) {
        this.setState({text: event.target.value});
    }

    getConversation() {

        if (this.props.messages instanceof Error) {
            //this is a new chat or no messages
            return (
                <div>
                    New chat. Please type a message to the recipient.
                </div>
            )
        } else {
            const isMe = function (from) {
                if (from === Meteor.user().username) {
                    return {textAlign: 'right'};
                }
            };

            const showAvatar = (name) => {
                if(name !== Meteor.user().username) {
                    return (<Avatar src={"https://api.adorable.io/avatars/175/" + name}/>);
                }
            };
            const showMyAvatar = (name) => {
                if(name === Meteor.user().username) {
                    return (<Avatar src={"https://api.adorable.io/avatars/175/" + name}/>);
                }
            };

            return (
                <List>
                    {this.props.messages.map((msg) => (
                        <ListItem key={msg._id}
                                  leftAvatar={showAvatar(msg.from)}
                                  rightAvatar={showMyAvatar(msg.from)}
                                  style={isMe(msg.from)}
                                  primaryText={msg.message}
                                  secondaryText={moment(msg.date).fromNow()}
                                  disabled={true}
                        />
                    ))}
                </List>
            )
        }
    }

    render() {
        return (
            <div>
                <Sticky>
                    <Toolbar>
                        <ToolbarGroup float="left" firstChild={true}>
                            <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon /></IconButton>
                        </ToolbarGroup>
                        <ToolbarGroup float="left">
                            <ToolbarTitle text={this.props.params.username} onTouchTap={()=>{browserHistory.push('/profile/' + this.props.params.username)}}/>
                        </ToolbarGroup>
                        <ToolbarGroup float="right">
                            <IconButton onTouchTap={this.clear.bind(this)}><DeleteIcon /></IconButton>
                        </ToolbarGroup>
                    </Toolbar>
                </Sticky>

                <div className="ui container" style={{marginTop: '50px', marginBottom: '50px'}}>
                    {this.getConversation()}
                </div>

                <Footer text={this.state.text} onSubmit={this.submit.bind(this)} onChange={this.change.bind(this)}/>
            </div>
        );
    }
}