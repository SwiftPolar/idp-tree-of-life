import React from 'react';
import {browserHistory} from 'react-router';
import Header from './../Header.jsx';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            searchValue: ""
        }
    }

    search(value) {
        console.log(value);
        let searching = true;
        if (value === "") searching = false;
        this.setState({search: searching, searchValue: value});
    }

    getTopics() {
        const summary = (content) => {
            if (content.length > 200) {
                return content.substring(0, 200) + " (read more)";
            } else {
                return content;
            }
        };
        return (
            <div>
                {this.props.topics.map((obj) => {
                    if (!this.state.search) {
                        return (
                            <Card key={obj._id}>
                                <CardHeader
                                    title={obj.title}
                                    subtitle={obj.owner}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardText expandable={true}>
                                    {summary(obj.content)}
                                </CardText>
                                <CardActions expandable={true}>
                                    <FlatButton label="View Topic"
                                                onTouchTap={()=>{browserHistory.push('/forums/topic/' + obj._id)}}/>
                                </CardActions>
                            </Card>
                        );
                    } else {
                        if(obj.title.indexOf(this.state.searchValue) !== -1) {
                            return (
                                <Card key={obj._id}>
                                    <CardHeader
                                        title={obj.title}
                                        subtitle={obj.owner}
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                    />
                                    <CardText expandable={true}>
                                        {summary(obj.content)}
                                    </CardText>
                                    <CardActions expandable={true}>
                                        <FlatButton label="View Topic"
                                                    onTouchTap={()=>{browserHistory.push('/forums/topic/' + obj._id)}}/>
                                    </CardActions>
                                </Card>
                            );
                        }
                    }
                })}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header search={this.search.bind(this)}/>
                {this.getTopics()}

            </div>
        );
    }
}