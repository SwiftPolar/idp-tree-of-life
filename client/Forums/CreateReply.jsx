import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            open: false,
            error: {
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

    confirm() {
        let error = {};
        error.content = "";
        if (this.state.content == "") error.content = "Your reply cannot be empty";
        if (error.content != "") {
            this.setState({error: {content: error.content}});
        } else {
            Meteor.call('newReply', this.props.params.id, this.state.content, (error, result) => {
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
                onTouchTap={() => {browserHistory.push('/forums/topic/'+this.props.params.id)}}
            />
        ];


        return (
            <div>
                <div className="ui grid" id="createreplyform">
                    <div className="row">
                        <div className="fifteen wide column">
                            <h1 className="ui header centered">Create new Reply</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="fifteen wide column row centered">
                            <TextField
                                hintText="Enter your reply"
                                multiLine={true}
                                rows={9}
                                rowsMax={9}
                                fullWidth={true}
                                floatingLabelText="Reply"
                                value = {this.state.content}
                                onChange = {this.handleContentInput.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="ui bottom fixed secondary menu" id="createreplyfooter">
                    <div className="ui two item menu">
                        <div className="item">
                            <RaisedButton label="Cancel" primary={true} fullWidth={true} onTouchTap={this.cancel.bind(this)}/>
                        </div>
                        <div className="item">
                            <RaisedButton label="Confirm" secondary={true} fullWidth={true} onTouchTap={this.confirm.bind(this)}/>
                        </div>
                    </div>
                </div>
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
                    title="Replied successfully!"
                    modal={false}
                    actions={successActions}
                    open={this.state.submit.success}
                    onRequestClose={() => {browserHistory.push('/forums/topic/'+this.props.params.id)}}
                >
                    Continue back to topic
                </Dialog>

            </div>
        )
    }
}