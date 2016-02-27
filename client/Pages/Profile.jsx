import React from 'react';
import { browserHistory } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import IconButton from 'material-ui/lib/icon-button';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';
import ChatIcon from 'material-ui/lib/svg-icons/communication/chat-bubble-outline';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            error: false,
            disabled: false
        };

        let myProfile = this.props.params.username === Meteor.user().username;

        Meteor.call('isFriend',this.props.params.username, (error, result) => {
            let disabled = ( myProfile || (!myProfile && result) );
            this.setState({disabled: disabled}) ;
        });
    }

    getActivities() {
        let activities = this.props.data.activity;

        let gallery = (activity) => {
            return (
                <div className="event" key={activity._id} style={{marginBottom: '-50px'}}>
                    <div className="content">
                        <div className="summary">
                            commented on <a
                            onClick={() => {browserHistory.push("/gallery/" + activity.image)}}>picture</a>
                        </div>
                    </div>
                </div>
            );
        };

        let topic = (activity) => {
            return (
                <div className="event" key={activity._id} style={{marginBottom: '-50px'}}>
                    <div className="content">
                        <div className="summary">
                            started new <a
                            onClick={() => {browserHistory.push("/forums/topic/" + activity._id)}}>topic</a>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className="ui small feed" style={{marginTop: '20px'}}>
                <h4 className="ui dividing header">Latest 5 Activities</h4>

                {activities.map((activity) => {
                    if (activity.hasOwnProperty('comment')) {
                        return (gallery(activity));
                    } else {
                        return (topic(activity));
                    }
                })}
            </div>
        );
    }

    getImages() {
        return (
            <div className="ui two cards">
                {this.props.data.images.map((obj) => (
                    <a className="card" key={obj._id} href={"/gallery/" + obj._id}>
                        <div className="image">
                            <img src={obj.image}/>
                        </div>
                        <div className="extra">
                            {obj.tag.join(" #")}
                        </div>
                    </a>
                ))}
            </div>
        );
    }

    friend() {
        Meteor.call('addFriend', this.props.params.username, (error, result) => {
            if(error) {
                this.setState({ error: true })
            } else {
                this.setState({ add: true });
            }
        });
    }

    render() {
        const avatar = (username) => {return ("https://api.adorable.io/avatars/175/" + username + ".png")};


        const errorActions = [
            <FlatButton
                label="Retry"
                primary={true}
                onTouchTap={() => {this.setState({ error: !this.state.error })}}
            />
        ];

        const successActions = [
            <FlatButton
                label="Tap here to continue"
                primary={true}
                onTouchTap={() => {this.setState({ add: !this.state.add })}}
            />
        ];

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup float="left" firstChild={true}>
                        <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon /></IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <RaisedButton disabled={this.state.disabled} label="Add Friend" primary={true} onTouchTap={this.friend.bind(this)}/>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <IconButton onTouchTap={()=>{browserHistory.push('/chat/' + this.props.params.username)}}><ChatIcon /></IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div className="ui container" style={{marginTop: '15px'}}>
                    <h3 className="ui header centered">Viewing {this.props.params.username}'s Profile</h3>
                    <img className="ui centered image" src={avatar(this.props.params.username)} />
                </div>
                <div className="ui container">
                    {this.getActivities()}
                </div>
                <div className="ui container" style={{marginTop: '10px'}}>
                    <h4 className="ui dividing header">Shared images</h4>
                    {this.getImages()}
                </div>

                <Dialog
                    title="An error has occurred!"
                    actions={errorActions}
                    modal={false}
                    open={this.state.error}
                    onRequestClose={() => {this.setState({ error: !this.state.error })}}
                >
                    Please retry adding.
                </Dialog>
                <Dialog
                    title="Friend added!"
                    modal={false}
                    actions={successActions}
                    open={this.state.add}
                    onRequestClose={() => {this.setState({ add: !this.state.add })}}

                />
            </div>
        );
    }
}