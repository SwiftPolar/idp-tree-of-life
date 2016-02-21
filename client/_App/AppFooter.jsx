import React from 'react';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/add-a-photo';


export class AppFooter extends React.Component {

    logout() {
        console.log("LOGGING OUT!");
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
}
;

/*

 <div className="ui grid container middle aligned">
 <div className="two wide column centered">
 <div>
 <FloatingActionButton onTouchStart={this.handleCamera} onMouseDown={this.handleCamera}>
 <Camera />
 </FloatingActionButton>
 </div>
 </div>
 </div>


 */