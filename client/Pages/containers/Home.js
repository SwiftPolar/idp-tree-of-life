import {composeWithTracker} from 'react-komposer'
import HomeFeed from './../components/Home.jsx';

function composer(props, onData) {
    Meteor.call('getFeed', (error, result) => {
        if (error) {
            console.log("ERROR");
        } else {
            Feed = new Mongo.Collection(null);
            result.map((obj) => {
                Feed.insert(obj);
            });
            let feed = Feed.find({}, {sort: {date: -1}}).fetch();
            onData(null, {feed: feed});
        }
    });


}

export default composeWithTracker(composer)(HomeFeed);