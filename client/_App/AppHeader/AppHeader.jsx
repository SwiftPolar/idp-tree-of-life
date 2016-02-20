import React from 'react';
import { browserHistory } from 'react-router';

export class AppHeader extends React.Component {
    logout() {
        console.log("LOGGING OUT!");
        Meteor.logout((error) => {
            if(!error) {
                browserHistory.push("/login");
            }
        });
    }

    render() {
        return (
            <div>
                This is Header
                <button onClick={this.logout.bind(this)}>LOG OUT</button>
            </div>
        );
    }
};