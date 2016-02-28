import React from 'react';
import { browserHistory } from 'react-router';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    processFeed() {
        const summary = (content) => {
            if (content.length > 200) {
                return content.substring(0, 200) + " (read more)";
            } else {
                return content;
            }
        };

        let avatar = (username) => {return ("https://api.adorable.io/avatars/175/" + username + ".png")};


        let comment = (obj) => {
            return (
                <div className="event" key={obj._id}>
                    <div className="label">
                        <img src={avatar(obj.owner)} onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}} />
                    </div>
                    <div className="content">
                        <div className="summary">
                            <a className="user" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>{obj.owner + " "}</a>
                            {" has posted a new comment"}
                            <a onClick={() => {browserHistory.push("/gallery/" + obj.image)}}>
                                {" on image"}
                            </a>
                            <div className="date">{moment(obj.date).fromNow()}</div>
                        </div>
                    </div>
                </div>
            );
        };
        let image = (obj) => {
            return (
                <div className="event" key={obj._id}>
                    <div className="label">
                        <img src={avatar(obj.owner)} onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}/>
                    </div>
                    <div className="content">
                        <div className="summary">
                            <a className="user" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>{obj.owner + " "}</a>
                            {" has posted a picture"}
                            <div className="date">{moment(obj.date).fromNow()}</div>
                        </div>

                        <div className="extra images">
                            <img onClick={() => {browserHistory.push("/gallery/" + obj._id)}}
                                 src={obj.image}/>
                        </div>
                    </div>


                </div>
            );
        };

        let topic = (obj) => {
            return (
                <div className="event" key={obj._id}>
                    <a className="label" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>
                        <img src={avatar(obj.owner)} onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}/>
                    </a>
                    <div className="content">
                        <div className="summary">
                            <a className="user" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>{obj.owner + " "} </a>
                            {" has created a new topic:"}
                            <a onClick={() => {browserHistory.push("/forums/topic/" + obj._id)}}>
                                {" " + obj.title}
                            </a>
                            <div className="date">{moment(obj.date).fromNow()}</div>
                        </div>
                        <div className="extra text">
                            {summary(obj.content)}
                        </div>
                    </div>
                </div>
            );
        };

        let reply = (obj) => {
            return (
                <div className="event" key={obj._id}>
                    <a className="label" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>
                        <img src={avatar(obj.owner)} onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}/>
                    </a>
                    <div className="content">
                        <div className="summary">
                            <a className="user" onClick={()=>{
                        browserHistory.push('/profile/' + obj.owner);}}>{obj.owner + " "} </a>
                            {" has replied to a "}
                            <a onClick={() => {browserHistory.push("/forums/topic/" + obj.topic)}}>
                                topic
                            </a>
                            <div className="date">{moment(obj.date).fromNow()}</div>
                        </div>
                        <div className="extra text">
                            {summary(obj.content)}
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className="ui feed">
                {this.props.feed.map((obj) => {
                    if (obj.hasOwnProperty('public')) {
                        return (image(obj));
                    } else if (obj.hasOwnProperty('title')) {
                        return (topic(obj));
                    } else if (obj.hasOwnProperty('image')) {
                        return (comment(obj));
                    } else {
                        return (reply(obj));
                    }
                })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="ui container">
                {this.processFeed()}
            </div>
        )
    }
};