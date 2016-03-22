import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../InlineViewTopicHeader.jsx';

import { AppFooter } from "../../_App/AppFooter.jsx";
import InlineFooterReply from "../InlineFooterReply.jsx";

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';

import Dialog from 'material-ui/lib/dialog';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import CreateReply from '../InlineCreateReply.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);

        let alternative = false;
        if(Math.random() > 0.5) {
            alternative = true;
        }

        this.state = {
            open: false,
            haveImages: (this.props.images.length > 0),
            alternative : alternative,
            startTime: new Date().getTime()
        }
    }

    avatar(username) {
        return ("https://api.adorable.io/avatars/175/" + username + ".png")
    }

    getComments() {
        return (
            <div>
                {this.props.replies.map((obj) => (
                    <div className="comment" key={obj._id}>
                        <a className="avatar" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>
                            <img src={this.avatar(obj.owner)}/>
                        </a>
                        <div className="content">
                            <a className="author">{obj.owner}</a>
                            <div className="metadata">
                                <span className="date">{moment(obj.date).fromNow()}</span>
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

    mediaBrowser() {
        this.setState({open: !this.state.open});
    }

    getReplyBox() {
        if (!this.state.alternative) {
            return (
                <div className="ui container" id="replybox">
                    <CreateReply id={this.props.params.id} experiment={this.logTime.bind(this)}/>
                </div>
            );
        }
    }

    getFooter() {

        if (!this.state.alternative) {
            return (
                <AppFooter />
            );
        } else {
            return (
                <InlineFooterReply id={this.props.params.id} experiment={this.logTime.bind(this)} />
            );
        }
    }

    logTime() {
        let endTime = new Date().getTime();
        console.log("ALTERNATE: " + this.state.alternative
            + " START" + this.state.startTime + " END: " + endTime
            + " TAKEN: " + (endTime - this.state.startTime));
        //reset counter incase person submits multiple times!
        this.setState({startTime: new Date().getTime()});

    }

    render() {

        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onTouchTap={this.mediaBrowser.bind(this)}
            />
        ];


        return (
            <div>
                <Header id={this.props.params.id} alternative={this.state.alternative} />
                <Card style={{marginTop: '50px'}}>
                    <CardHeader
                        title={this.props.topic.owner}
                        subtitle="Topic Starter"
                        avatar={this.avatar(this.props.topic.owner)}
                        onClick={()=>{
                        browserHistory.push('/profile/' + this.props.topic.owner);}}
                    />
                    <CardTitle title={this.props.topic.title}
                               subtitle={"Posted on: " + this.props.topic.date.toLocaleString()}
                    />
                    <CardText>{this.props.topic.content}</CardText>
                    <CardActions>
                        <FlatButton label="View Attached Media" disabled={!this.state.haveImages}
                                    onTouchTap={this.mediaBrowser.bind(this)}/>
                    </CardActions>
                </Card>
                {this.getReplyBox()}
                <div className="ui container comments" style={{marginBottom: '100px'}}>
                    <h3 className="ui dividing header">Replies</h3>
                    {this.getComments()}
                </div>
                {this.getFooter()}
                <Dialog
                    title="Attached Media"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.mediaBrowser.bind(this)}
                >
                    <GridList
                        cellHeight={100}
                    >
                        {this.props.images.map(tile => (
                            <GridTile
                                key={tile._id}
                                subtitle={tile.tag.join(" #")}
                            >
                                <img src={tile.image}
                                     onClick={function() {browserHistory.push("/gallery/" + tile._id)}}/>
                            </GridTile>
                        ))}
                    </GridList>
                </Dialog>
            </div>
        );
    }
}