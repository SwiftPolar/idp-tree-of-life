import React from 'react';
import { browserHistory } from 'react-router';
import Webcam from 'webcamjs';

import RaisedButton from 'material-ui/lib/raised-button';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            live: false,
            freeze: false
        };

        Webcam.set({
            width: 320,
            height: 240,
            dest_width: 640,
            dest_height: 480,
            constraints: {
                facingMode: "environment"
            }
        });
    }

    live() {
        this.setState({live: true});
    }

    componentDidMount() {
        Webcam.on('error', function (err) {
            browserHistory.goBack();
        });
        Webcam.on('live', () => {
            this.live();
        });

        Webcam.attach('#camera');
    }

    freeze(event) {
        if (this.state.freeze) {
            Webcam.unfreeze();
            this.setState({freeze: false})
        } else {
            Webcam.freeze();
            this.setState({freeze: true})
        }
    }

    submit(event) {
        Webcam.snap((data_uri) => {
            this.props.capture(data_uri);
            //shutdown webcam
            Webcam.reset();
        });
    }

    render() {
        const cancelBtn = (event) => {
            if (!this.state.freeze) {
                return (
                    <RaisedButton label="Cancel" primary={true} fullWidth={true}
                                  onTouchTap={()=>{
                                      Webcam.reset();
                                      browserHistory.goBack();
                                      }
                                  }/>
                );
            } else {
                return (
                    <RaisedButton label="Retake" primary={true} fullWidth={true}
                                  disabled={!this.state.live}
                                  onTouchTap={this.freeze.bind(this)}/>
                );
            }
        };

        const confirmBtn = (event) => {
            if (this.state.freeze) {
                return (
                    <RaisedButton label="Confirm" secondary={true} fullWidth={true}
                                  disabled={!this.state.live}
                                  onTouchTap={this.submit.bind(this)}/>
                );
            } else {
                return (
                    <RaisedButton label="Capture" secondary={true} fullWidth={true}
                                  disabled={!this.state.live}
                                  onTouchTap={this.freeze.bind(this)}/>
                );
            }
        };

        return (
            <div>
                <div className="ui grid">
                    <div className="row">
                        <div className="fifteen wide column centered">
                            <div id="camera"></div>
                        </div>
                    </div>
                </div>
                <div className="ui bottom fixed secondary menu" id="camerafooter">
                    <div className="ui two item menu">
                        <div className="item">
                            {cancelBtn()}
                        </div>
                        <div className="item">
                            {confirmBtn()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}