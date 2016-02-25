import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../ViewEntryHeader.jsx';

import AppFooter from '../../_App/AppFooter.jsx';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: '100%',
                height: '50%',
                overflowY: 'auto',
                marginTop: 24,
            }
        };

        return (
            <div>
                <Header id={this.props.params.id}/>
                <Card>
                    <CardTitle title={this.props.entry.title}
                               subtitle={"Posted on: " + this.props.entry.date.toLocaleString()}
                    />
                    <CardText>{this.props.entry.content}</CardText>
                </Card>

                <GridList
                    cellHeight={200}
                    style={styles.gridList}
                >
                    {this.props.images.map(tile => (
                        <GridTile
                            key={tile._id}
                            subtitle={tile.tag.join(" #")}
                        >
                            <img src={tile.image} onClick={()=>{browserHistory.push("/gallery/" + tile._id)}}/>
                        </GridTile>
                    ))}
                </GridList>

            </div>
        );
    }
}