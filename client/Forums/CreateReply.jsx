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
            title: "",
            content: "",
            open: false
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
        console.log("ADD TO DATABASE!!!!");
    }

    cancel() {
        this.setState({open: !this.state.open});
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

        return (
            <div>
                <div className="ui grid" id="createreplyform">
                    <div className="row">
                        <div className="fifteen wide column">
                            <h1 className="ui header centered">Create new Topic</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="fifteen wide column row centered">
                            <TextField
                                hintText="Topic Title"
                                fullWidth={true}
                                floatingLabelText="Title"
                                multiLine={true}
                                rows={2}
                                rowsMax={2}
                                value = {this.state.title}
                                onChange = {this.handleTitleInput.bind(this)}
                            />
                            <TextField
                                hintText="Enter your topic content"
                                multiLine={true}
                                rows={7}
                                rowsMax={7}
                                fullWidth={true}
                                floatingLabelText="Content"
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
            </div>
        )
    }
}