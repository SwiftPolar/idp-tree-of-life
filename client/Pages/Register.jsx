import React from 'react';
import {browserHistory} from 'react-router';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            error: ""
        };
    }

    componentDidMount() {
        //form validation
        $('.ui.form').form({
            inline: true,
            fields: {
                username: {
                    identifier: 'username',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a username'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a password'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: 'Your password must be at least {ruleValue} characters'
                        }
                    ]
                },
                confirmPassword: {
                    identifier: 'confirmPassword',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please confirm your password'
                        },
                        {
                            type: 'match[password]',
                            prompt: "Passwords don't match"
                        }
                    ]
                },
                email: {
                    identifier: 'email',
                    optional: true,
                    rules: [
                        {
                            type: 'email',
                            prompt: "Please enter a valid email address"
                        }
                    ]
                }
            },
            onSuccess: this.submitForm.bind(this)
        });
    }
    componentDidUpdate(prevProps, prevState) {
        let error = this.state.error;
        let prevError = prevState.error;
        if (error !== prevError && error) {
            $(this.refs.error).modal({detachable: false, onHidden: () => {
                this.setState({error: ""});}}).modal('show');
        }
    }


    submitForm(event, fields) {
        event.preventDefault();
        Meteor.call('createNewAccount', fields, (error) => {
            if (error) {
                this.setState({error: error.reason});
            } else {
                browserHistory.push('/');
            }
        });
    };


    registerForm() {

        let input = {
            username: (event) => {
                this.setState({username: event.target.value});
            },
            password: (event) => {
                this.setState({password: event.target.value});
            },
            confirmPassword: (event) => {
                this.setState({confirmPassword: event.target.value});
            },
            email: (event) => {
                this.setState({email: event.target.value});
            }
        };

        return (
            <div>
                <form className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" value={this.state.username} onChange={input.username} name="username"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={input.password} name="password"/>
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input type="password" value={this.state.confirmPassword} onChange={input.confirmPassword}
                               name="confirmPassword"/>
                    </div>
                    <div className="field">
                        <label>Email (*Optional)</label>
                        <input type="text" value={this.state.email} onChange={input.email} name="email"/>
                    </div>
                    <button className="ui fluid button right floated" type="submit">Register</button>
                    <div className="ui error message"></div>
                </form>
            </div>
        );
    }

    errorMessage() {
        if (this.state.error) {
            return (
                <div className="ui modal" ref="error">
                    <div className="ui floating error message">
                        <div className="header">Username has been taken!</div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="holder">
                {this.errorMessage()}
                <div className="middle">
                    <div className="ui grid container">
                        <div className="row">
                            <div className="centered floated sixteen wide column content">
                                <h1 className="ui header center aligned">Create new Account</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="centered floated sixteen wide column content">
                                {this.registerForm()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="sixteen wide column center aligned">
                                <a href="/login"><p align="right">Already have an account? Log in here</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}