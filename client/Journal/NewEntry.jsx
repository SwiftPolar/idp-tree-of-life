import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

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
            }
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
        console.log("ADD TO DATABASE");

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

    render() {
        const mediaActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.attachMedia.bind(this)}
            />
        ];

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
                onTouchTap={() => {browserHistory.push('/journal')}}
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
                </div>

                <Dialog
                    title="Choose media to attach"
                    actions={mediaActions}
                    modal={true}
                    contentStyle={mediaAttachmentStyle}
                    open={this.state.openMedia}
                >
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
                    List of media here List of media here List of media here List of media here List of media here
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
                    onRequestClose={() => {browserHistory.push('/journal')}}
                >
                    Continue to view your entry
                </Dialog>
            </div>
        );
    }
}
