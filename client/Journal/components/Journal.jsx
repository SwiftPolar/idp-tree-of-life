import React from 'react';
import {browserHistory} from 'react-router';

import Header from './../Header.jsx';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export default class extends React.Component {

    getEntries() {

        const summary = (content) => {
            if(content.length > 200) {
                return content.substring(0, 200) + " (read more)";
            } else {
                return content;
            }
        };

        return (
            <div>
                {this.props.journal.map((obj) => (
                    <Card key={obj._id}>
                        <CardHeader
                            title={obj.title}
                            subtitle={obj.date.toLocaleDateString()}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            {summary(obj.content)}
                        </CardText>
                        <CardActions expandable={true}>
                            <FlatButton
                                label="View Entry"
                                onTouchTap={()=>{
                                                setTimeout(
                                                function (){browserHistory.push('/journal/' + obj._id)}
                                                , 400)}}
                            />
                        </CardActions>
                    </Card>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header />
                {this.getEntries()}
            </div>
        )
    }
}