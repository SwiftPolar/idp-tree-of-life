import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router"

//front page stuff non-app
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';

//app pages and components
import { Home } from '../Pages/Home.jsx';
import { App } from './App.jsx';
import Gallery from '../Pages/Gallery.jsx';
import Journal from '../Journal/Journal.jsx';
import Camera from '../Pages/Camera.jsx';

//forums
import Forums from '../Forums/containers/Forums.js';
import CreateTopic from '../Forums/CreateTopic.jsx';
import ViewTopic from '../Forums/containers/ViewTopic.js';
import CreateReply from '../Forums/CreateReply.jsx';

//TESTING STUFF BELOW, DELETE WHEN DONE
import { About } from '../Pages/About.jsx';
import TaskList from '../containers/task_list.js';
import Task from '../containers/task_view.js';
//TESTING STUFF ABOVE, DELETE WHEN DONE

export const Routes = () => {
    requireAuth = (nextState, replace) => {
        if (!Meteor.userId()) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }
    };
    isUserLoggedIn = (nextState, replace) => {
        if (Meteor.userId()) {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            });
        }
    }
    return (
        <Router history={browserHistory}>
            <Route path="/login" component={Login} onEnter={isUserLoggedIn}></Route>
            <Route path="/register" component={Register} onEnter={isUserLoggedIn}></Route>
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRoute component={Home} />
                <Route path="/forums" component={Forums}></Route>
                <Route path="/gallery" component={Gallery}></Route>
                <Route path="/journal" component={Journal}></Route>

                <Route path="/about(/:id)" component={About}></Route>
                <Route path="/tasks" component={TaskList}></Route>
                <Route path="/tasks/:id" component={Task}></Route>
            </Route>

            <Route path="/camera" component={Camera} onEnter={requireAuth}></Route>
            <Route path="/forums/createtopic" component={CreateTopic} onEnter={requireAuth}></Route>
            <Route path="/forums/topic/:id" component={ViewTopic} onEnter={requireAuth}></Route>
            <Route path="/forums/topic/:id/reply" component={CreateReply} onEnter={requireAuth}></Route>

        </Router>
    );
};