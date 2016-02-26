import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import AttachMedia from '../utility/containers/AttachMedia.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            open: false,
            category: "All",
            error: {
                title: "",
                content: ""
            },
            submit: {
                error: false,
                success: false
            },
            topicId: "",
            openMedia: false,
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

    handleCategory(event, index, value) {
        this.setState({category: value});
    }

    getCategories() {
        let arr = ["All", "Nutrition", "Growing Up", "Education"];
        let results = [];
        for (let value in arr) {
            results.push(<MenuItem value={arr[value]} key={arr[value]} primaryText={arr[value]}/>);
        }
        return (results);
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
            Meteor.call('newTopic', this.state.title, this.state.category, this.state.content, Object.keys(this.state.media), (error, result) => {
                if (error) {
                    console.log(error);
                    this.setState({submit: {error: true, success: false}});
                } else {
                    this.setState({topicId: result, submit: {error: false, success: true}});
                }
            });
        }
    }

    cancel() {
        this.setState({open: !this.state.open});
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
                onTouchTap={() => {
                        browserHistory.push('/forums');
                        browserHistory.push('/forums/topic/'+this.state.topicId)
                        }
                    }

            />
        ];
        const mediaAttachmentStyle = {
            width: '100%',
            maxWidth: 'none'
        };

        return (
            <div>
                <div className="ui grid" id="createtopicform">
                    <div className="row">
                        <div className="fifteen wide column">
                            <h1 className="ui header centered">Create new Topic</h1>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: '-50px'}}>
                        <div className="fifteen wide column row centered">
                            <TextField
                                hintText="Topic Title"
                                fullWidth={true}
                                floatingLabelText="Title"
                                multiLine={true}
                                rows={2}
                                rowsMax={2}
                                value={this.state.title}
                                onChange={this.handleTitleInput.bind(this)}
                                errorText={this.state.error.title}
                            />
                            <SelectField maxHeight={300} value={this.state.category}
                                         onChange={this.handleCategory.bind(this)}>
                                {this.getCategories()}
                            </SelectField>
                            <TextField
                                hintText="Enter your topic content"
                                multiLine={true}
                                rows={7}
                                rowsMax={7}
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
                <div className="ui bottom fixed secondary menu" id="createtopicfooter">
                    <div className="ui two item menu">
                        <div className="item">
                            <RaisedButton label="Cancel" primary={true} fullWidth={true}
                                          onTouchTap={this.cancel.bind(this)}/>
                        </div>
                        <div className="item">
                            <RaisedButton label="Confirm" secondary={true} fullWidth={true}
                                          onTouchTap={this.confirm.bind(this)}/>
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
                    <AttachMedia public={true} onSelect={this.onMediaSelect.bind(this)}
                                 selected={Object.keys(this.state.media)}/>
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
                    title="Topic successfully created!"
                    modal={false}
                    actions={successActions}
                    open={this.state.submit.success}
                    onRequestClose={() => {
                        browserHistory.push('/forums');
                        browserHistory.push('/forums/topic/'+this.state.topicId)}
                    }
                >
                    Continue to view your topic
                </Dialog>
            </div>
        )
    }
}