import React from 'react';
import { browserHistory } from 'react-router'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        //sets initial states/values
        this.state = {
            username: "",
            password: "",
            submitted: false,
            error: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let error = this.state.error;
        let prevError = prevState.error;
        if (error !== prevError && error) {
            $(this.refs.error).modal({detachable: false}).modal('show');
        }
    }

    loginForm() {

        let inputUser = (event) => {
            this.setState({username: event.target.value});
        };

        let inputPassword = (event) => {
            this.setState({password: event.target.value});
        };

        let submitForm = (event) => {
            event.preventDefault();
            this.setState({submitted: true});
            if (this.state.username && this.state.password) {
                Meteor.loginWithPassword(this.state.username, this.state.password, processLogin)
            }
        };

        let processLogin = (error) => {
            if (error) {
                this.setState({error: this.state.error + 1});
            } else {
                console.log("LOGGED IN!");
                browserHistory.push('/');
            }
        };


        return (
            <div className="ui container">
                <form className="ui form">
                    <div className={this.state.submitted && !this.state.username? "field error" : "field"}>
                        <input type="text" onChange={inputUser} value={this.state.username} id="username"
                               placeholder="Username"/>
                    </div>
                    <div className={this.state.submitted && !this.state.username? "field error" : "field"}>
                        <input className="field" type="password" onChange={inputPassword} value={this.state.password}
                               placeholder="Password"/>
                    </div>
                    <button className="ui button fluid right floated" onClick={submitForm} type="submit">Login</button>
                </form>
            </div>
        );
    }

    errorMessage() {
        if (this.state.error) {
            return (

                <div className="ui modal" ref="error">
                    <div className="ui floating error message">
                        <div className="header">Error logging in</div>
                        <div>
                            <p>Incorrect username or password!</p>
                            {
                                (this.state.error >= 3)
                                ? <a href="/forgetpassword">Forgotten your password?</a>
                                : ""
                            }
                        </div>

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
                                <img className="ui centered image" src="/images/Tree_of_Life.png"></img>
                            </div>
                        </div>
                        <div className="row">
                            <div className="centered floated sixteen wide column content">
                                {this.loginForm()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="sixteen wide column center aligned">
                                <a href="/register"><p align="right">Don't have an account? Register here</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}