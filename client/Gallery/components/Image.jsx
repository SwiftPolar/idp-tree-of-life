import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../ImageHeader.jsx';

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

    getComments() {
        if(this.props.images.public) {

        return (
            <div>
                {this.props.comments.map((obj) => (
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
                                {obj.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>);

        } else {
            return (
                <div>
                    This image is not set to public
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Header id={this.props.params.id} owner={this.props.images.owner}/>

                <Card>
                    <CardTitle title="" subtitle={this.props.images.tag.join(" #")}/>
                    <CardMedia>
                        <img src={this.props.images.image} />
                    </CardMedia>
                    <CardText>{this.props.images.description}</CardText>
                </Card>
                <div className="ui container comments">
                    <h3 className="ui dividing header">Comments</h3>
                    {this.getComments()}
                </div>

                <AppFooter />
            </div>
        );
    }
}