import React from 'react';
import { browserHistory } from 'react-router';


import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/add-a-photo';
import TextField from 'material-ui/lib/text-field';


export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        Meteor.logout((error) => {
            if (!error) {
                browserHistory.push("/login");
            }
        });
    }

    handleCamera() {
        browserHistory.push("/camera");
    }

    render() {
        let style = {};
        return (
            <div className="ui bottom fixed secondary menu" id="footer">
                    <div className="item" style={{width:'70%'}}>
                        <TextField
                            floatingLabelText="Message"
                            multiLine={true}
                            rows={2}
                            rowsMax={2}
                            fullWidth={true}
                            hintText="Type your message"
                            value={this.props.text}
                            onChange={this.props.onChange}
                            onEnterKeyDown={this.props.onSubmit}
                        />
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
