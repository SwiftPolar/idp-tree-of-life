import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

/*
 MeteorCamera.getPicture((error, data) => {

 if (error) {
 browserHistory.goBack();
 } else {
 this.setState({image: data});
 }
 });
 */

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            tag: "",
            description: "",
            open: false
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
                                value = {this.state.tag}
                                onChange = {this.handleTagInput.bind(this)}
                            />
                            <TextField
                                hintText="Enter description of this moment"
                                multiLine={true}
                                rows={4}
                                rowsMax={4}
                                fullWidth={true}
                                floatingLabelText="Description"
                                value = {this.state.description}
                                onChange = {this.handleDescriptionInput.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="ui bottom fixed secondary menu" id="camerafooter">
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