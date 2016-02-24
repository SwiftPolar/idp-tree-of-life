import React from 'react';
import { browserHistory } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';

import IconButton from 'material-ui/lib/icon-button';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';
import CommentIcon from 'material-ui/lib/svg-icons/communication/comment';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';

import TextField from 'material-ui/lib/text-field';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

   
    editImage() {
        browserHistory.push("/gallery/" + this.props.id + "/edit");
    }
    commentImage() {
        browserHistory.push("/gallery/" + this.props.id + "/comment");
    }

    isOwner() {
        if(Meteor.user().username === this.props.owner) {
            return <RaisedButton label="Edit" primary={true} onTouchTap={this.editImage.bind(this)}/>
        }
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup float="left" firstChild={true}>
                    <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon onTouchTap={()=>{browserHistory.goBack()}} /></IconButton>
                </ToolbarGroup>
                <ToolbarGroup float="left">
                    {this.isOwner()}
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <IconButton onTouchTap={this.commentImage.bind(this)}><CommentIcon onTouchTap={this.commentImage.bind(this)} /></IconButton>
                    <IconButton><ShareIcon /></IconButton>

                </ToolbarGroup>
            </Toolbar>
        );
    }
}