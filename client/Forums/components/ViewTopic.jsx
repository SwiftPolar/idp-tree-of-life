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

import Dialog from 'material-ui/lib/dialog';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            haveImages: (this.props.images.length > 0)
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
                            <img src={this.avatar(obj.owner)} />
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
                <Header id={this.props.params.id}/>
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
                        <FlatButton label="View Attached Media" disabled={!this.state.haveImages} onTouchTap={this.mediaBrowser.bind(this)}/>
                    </CardActions>
                </Card>
                <div className="ui container comments">
                    <h3 className="ui dividing header">Replies</h3>
                    {this.getComments()}
                </div>
                <AppFooter />
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
                                <img src={tile.image} onClick={function() {browserHistory.push("/gallery/" + tile._id)}}/>
                            </GridTile>
                        ))}
                    </GridList>
                </Dialog>
            </div>
        );
    }
}