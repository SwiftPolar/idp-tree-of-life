import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import AttachMedia from '../utility/containers/AttachMedia.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            open: false,
            openMedia: false,
            error: {
                title: "",
                content: ""
            },
            submit: {
                error: false,
                success: false
            },
            media: {},
            mediaPage: 1
        };
    }

    handleTitleInput(event) {
        event.preventDefault();
        this.setState({title: event.target.value});
    }

    handleContentInput(event) {
        event.preventDefault();
        this.setState({content: event.target.value});
    }

    cancel() {
        this.setState({open: !this.state.open});
    }

    confirm() {
        let error = {};
        error.title = "";
        error.content = "";
        if (this.state.title == "") error.title = "Please fill in a title";
        if (this.state.content == "") error.content = "Please fill in some content";
        if (error.title != "" && error.content != "") {
            this.setState({error: {title: error.title, content: error.content}});
        } else {
            Meteor.call('newJournal', this.state.title, this.state.content, Object.keys(this.state.media), (error, result) => {
                if (error) {
                    console.log(error);
                    this.setState({submit: {error: true, success: false}});
                } else {
                    this.setState({journalId: result, submit: {error: false, success: true}});
                }
            });
        }


    }

    retry() {
        this.setState({
            submit: {
                error: false,
                success: false
            }
        });
    }

    attachMedia() {
        this.setState({openMedia: !this.state.openMedia});
    }

    mediaActions() {
        let mediaAction = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.attachMedia.bind(this)}
            />
        ];

        if (Object.keys(this.state.media).length) {
            mediaAction.push(<FlatButton
                label="Attach"
                primary={true}
                onTouchTap={this.attachMedia.bind(this)}
            />)
        }

        return mediaAction;
    }

    onMediaSelect(mediaId, mediaContent) {
        let current = this.state.media;
        if (!current.hasOwnProperty(mediaId)) {
            current[mediaId] = mediaContent;
        } else {
            delete current[mediaId];
        }
        this.setState({media: current});
    }

    getImages() {
        const object = this.state.media;
        const keys = Object.keys(object);
        return (
            <div className="ui two cards">
                {keys.map((key) => (
                    <div className="card" key={key}>
                        <div className="image">
                            <img src={object[key]}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.cancel.bind(this)}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onTouchTap={()=>{browserHistory.goBack()}}
            />
        ];
        const errorActions = [
            <FlatButton
                label="Retry"
                primary={true}
                onTouchTap={this.retry.bind(this)}
            />
        ];

        const successActions = [
            <FlatButton
                label="Tap here to continue"
                primary={true}
                onTouchTap={() => {browserHistory.browserHistory.goBack()}}
            />
        ];

        const mediaAttachmentStyle = {
            width: '100%',
            maxWidth: 'none'
        };

        return (
            <div>
                <AppBar
                    title="Edit Journal"
                    iconElementLeft={<IconButton onTouchTap={this.cancel.bind(this)}><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton onTouchTap={this.confirm.bind(this)} label="Save" />}
                />

                <div className="ui grid">
                    <div className="row">
                        <div className="fifteen wide column row centered">
                            <TextField
                                hintText="Entry Title"
                                fullWidth={true}
                                floatingLabelText="Title"
                                value={this.state.title}
                                onChange={this.handleTitleInput.bind(this)}
                                errorText={this.state.error.title}
                            />
                            <TextField
                                hintText="Enter your entry content"
                                multiLine={true}
                                rows={8}
                                rowsMax={8}
                                fullWidth={true}
                                floatingLabelText="Content"
                                value={this.state.content}
                                onChange={this.handleContentInput.bind(this)}
                                errorText={this.state.error.content}
                            />
                        </div>
                        <div className="fifteen wide column row centered">
                            <RaisedButton
                                fullWidth={true}
                                label="Attach Media"
                                primary={true}
                                onTouchTap={this.attachMedia.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="fifteen wide column row centered">
                        <div className="ui container">
                            {this.getImages()}
                        </div>
                    </div>
                </div>

                <Dialog
                    title="Choose media to attach"
                    actions={this.mediaActions()}
                    modal={true}
                    contentStyle={mediaAttachmentStyle}
                    open={this.state.openMedia}
                >
                    <AttachMedia onSelect={this.onMediaSelect.bind(this)} selected={Object.keys(this.state.media)}/>
                </Dialog>


                <Dialog
                    title="Discard all changes?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.cancel.bind(this)}
                >
                    Are you sure want to discard all your changes?
                </Dialog>
                <Dialog
                    title="An error has occurred!"
                    actions={errorActions}
                    modal={false}
                    open={this.state.submit.error}
                    onRequestClose={this.retry.bind(this)}
                >
                    Please retry your submission.
                </Dialog>
                <Dialog
                    title="Journal entry successful!"
                    modal={false}
                    actions={successActions}
                    open={this.state.submit.success}
                    onRequestClose={() => {browserHistory.browserHistory.goBack()}}
                >
                    Continue to view your entry
                </Dialog>
            </div>
        );
    }
}
