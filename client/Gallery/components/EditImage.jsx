import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';
import DeleteButton from 'material-ui/lib/svg-icons/action/delete';

import Checkbox from 'material-ui/lib/checkbox';

export default class extends React.Component {
    constructor(props) {
        super(props);
        if (props.images instanceof Error) {
            browserHistory.push("/");
        }
        this.state = {
            image: props.images.image,
            tag: props.images.tag.join(' #'),
            description: props.images.description,
            open: false,
            openDelete: false,
            submit: {
                error: false,
                success: false
            },
            public: props.images.public,
            facebook: false,
            delete: false
        };
    }

    handleTagInput(event) {
        event.preventDefault();
        this.setState({tag: event.target.value});
    }

    handleDescriptionInput(event) {
        event.preventDefault();
        this.setState({description: event.target.value});
    }

    confirm() {
        Meteor.call('editImage', this.props.images._id, this.state.image, this.state.tag, this.state.description, this.state.public, (error, result) => {
            if (error) {
                console.log(error);
                this.setState({submit: {error: true, success: false}});
            } else {
                this.setState({topicId: result, submit: {error: false, success: true}});
            }
        });

    }

    retry() {
        this.setState({
            submit: {
                error: false,
                success: false
            }
        });
    }

    delete() {
        Meteor.call('deleteImage', this.props.images._id, (error, result) => {
            if (error) {
                console.log(error);
                this.setState({submit: {error: true, success: false}});
            } else {
                this.setState({delete: true});
            }
        });
    }

    cancel() {
        this.setState({open: !this.state.open});
    }

    cancelDelete() {
        this.setState({openDelete: !this.state.openDelete});
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
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.cancelDelete.bind(this)}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onTouchTap={this.delete.bind(this)}
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
                onTouchTap={() => {browserHistory.goBack()}}
            />
        ];
        const deleteActions = [
            <FlatButton
                label="Tap here to continue"
                primary={true}
                onTouchTap={() => {browserHistory.goBack()}}
            />
        ];

        return (
            <div>
                <div className="ui grid" id="cameraform">
                    <div className="row">
                        <div className="fifteen wide column centered">
                            <img className="ui fluid image" src={this.state.image}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="fifteen wide column row centered">
                            <TextField
                                hintText="Tag your photo (separated with #)"
                                fullWidth={true}
                                floatingLabelText="Tags"
                                value={this.state.tag}
                                onChange={this.handleTagInput.bind(this)}
                            />
                            <TextField
                                hintText="Enter description of this moment"
                                multiLine={true}
                                rows={4}
                                rowsMax={4}
                                fullWidth={true}
                                floatingLabelText="Description"
                                value={this.state.description}
                                onChange={this.handleDescriptionInput.bind(this)}
                            />
                            <Checkbox label="Make public" checked={this.state.public}
                                      onCheck={()=>{this.setState({ public: !this.state.public })}}/>
                            <Checkbox label="Share to Facebook" checked={this.state.facebook}
                                      onCheck={()=>{this.setState({ facebook: !this.state.facebook })}}/>
                            <Checkbox label="Delete" checked={this.state.openDelete}
                                      onCheck={()=>{this.setState({ openDelete: !this.state.openDelete })}}/>
                        </div>
                    </div>
                </div>
                <div className="ui bottom fixed secondary menu" id="camerafooter" style={{marginTop: '10px'}}>
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
                    title="Remove Image?"
                    actions={actionsDelete}
                    modal={false}
                    open={this.state.openDelete}
                    onRequestClose={this.cancelDelete.bind(this)}
                >
                    Are you sure want to delete this photo?
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
                    title="Image successfully edited!"
                    modal={false}
                    actions={successActions}
                    open={this.state.submit.success}
                    onRequestClose={() => {browserHistory.goBack()}}
                >
                    Image saved!
                </Dialog>
                <Dialog
                    title="Image successfully deleted!"
                    modal={false}
                    actions={deleteActions}
                    open={this.state.delete}
                    onRequestClose={() => {browserHistory.push("/gallery")}}
                >
                    Image successfully deleted!
                </Dialog>
            </div>
        )
    }
}