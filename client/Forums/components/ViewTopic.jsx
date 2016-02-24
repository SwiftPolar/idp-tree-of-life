import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../ViewTopicHeader.jsx';

import { AppFooter } from "../../_App/AppFooter.jsx";

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    getTopics() {
        return (
            <div>
                {this.props.replies.map((obj) => (
                    <div className="comment" key={obj._id}>
                        <a className="avatar">
                            <img src="http://lorempixel.com/100/100/nature/" />
                        </a>
                        <div className="content">
                            <a className="author">{obj.owner}</a>
                            <div className="metadata">
                                <span className="date">{obj.date.toLocaleString()}</span>
                            </div>
                            <div className="text">
                                {obj.content}
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header id={this.props.params.id}/>
                <Card>
                    <CardHeader
                        title={this.props.topic.owner}
                        subtitle="Topic Starter"
                        avatar="http://lorempixel.com/100/100/nature/"
                    />
                    <CardTitle title={this.props.topic.title}
                               subtitle={"Posted on: " + this.props.topic.date.toLocaleString()}
                    />
                    <CardText>{this.props.topic.content}</CardText>
                </Card>
                <div className="ui container comments">
                    <h3 className="ui dividing header">Replies</h3>
                    {this.getTopics()}
                </div>
                <AppFooter />
            </div>
        );
    }
}