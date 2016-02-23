import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../ViewTopicHeader.jsx';

import { AppFooter } from "../../_App/AppFooter.jsx";

import Sticky from 'react-sticky';

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

    render() {
        return (
            <div>
                <Sticky>
                    <Header />
                </Sticky>
                <Card>
                    <CardHeader
                        title={this.props.topic.owner}
                        subtitle="Topic Starter"
                        avatar="http://lorempixel.com/100/100/nature/"
                    />
                    <CardTitle title={this.props.topic.title}
                               />
                    <CardText>{this.props.topic.content}</CardText>
                </Card>
                <AppFooter />
            </div>
        );
    }
}