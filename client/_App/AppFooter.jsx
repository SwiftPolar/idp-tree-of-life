import React from 'react';
import { browserHistory } from 'react-router';


export class AppFooter extends React.Component {

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
                This is FOOTER
                <button onClick={this.logout.bind(this)}>LOG OUT</button>
            </div>
        );
    }
};