import React from 'react';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/add-a-photo';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';

export default class AppFooter extends React.Component {
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
            },
            inputStyle: {
                marginTop: '0px'
            }
        };
    }

    handleCamera() {
        browserHistory.push("/camera");
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
            Meteor.call('newReply', this.props.id, this.state.content, (error, result) => {
                if (error) {
                    console.log(error);
                    this.setState({submit: {error: true, success: false}});
                } else {
                    this.setState({content: "", topicId: result, submit: {error: false, success: true}});
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

    reset() {
        this.setState({
            open: !this.state.open,
            content: ""
        })
    }

    openReply(open) {
        if(open) {
            this.setState({inputStyle: {marginTop: '-180px'}});

        } else {
            this.setState({inputStyle: {marginTop: '-0px'}});
        }
    }

    render() {
        let style = {};

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.cancel.bind(this)}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onTouchTap={this.reset.bind(this)}
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
                onTouchTap={this.retry.bind(this)}
            />
        ];
        return (
            <div className="ui bottom fixed secondary menu" id="footer">
                <div className="item" style={{marginTop: '0px'}}>
                    <div>
                        <Card onExpandChange={this.openReply.bind(this)} style={this.state.inputStyle}>
                            <CardHeader
                                subtitle="Reply to Topic"
                                actAsExpander={true}
                                showExpandableButton={true}

                            />
                            <CardText expandable={true}>
                                <TextField
                                    hintText="Enter your reply"
                                    multiLine={true}
                                    rows={4}
                                    rowsMax={4}
                                    fullWidth={true}
                                    floatingLabelText="Reply"
                                    value = {this.state.content}
                                    errorText={this.state.error.content}
                                    onChange = {this.handleContentInput.bind(this)}
                                    style = {{marginTop: '-50px'}}
                                />
                            </CardText>
                            <CardActions expandable={true}>
                                <RaisedButton label="Discard" primary={true} onTouchTap={this.cancel.bind(this)}/>
                                <RaisedButton label="Confirm" secondary={true} onTouchTap={this.confirm.bind(this)}/>
                            </CardActions>
                        </Card>
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
                            onRequestClose={this.retry.bind(this)}
                        >
                            Continue back to topic
                        </Dialog>

                    </div>
                </div>
                <div className="right menu">
                    <div className="item">
                        <FloatingActionButton onTouchStart={this.handleCamera} onMouseDown={this.handleCamera}>
                            <Camera />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
};
