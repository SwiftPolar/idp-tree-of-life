import React from 'react';
import { browserHistory } from 'react-router';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
        MeteorCamera.getPicture((error, data) => {
            if (error) {
                browserHistory.goBack();
            } else {
                this.setState({image: data});
            }
        });
    }

    render() {
        return (
            <div className="ui grid">
                <div className="row">
                    <div className="fifteen wide column centered">
                        <img class="ui fluid image" src={this.state.image}/>
                    </div>
                </div>
                <div className="row">
                    <div className="fifteen wide column row centered">
                        <div className="ui form" id="form">
                            <div className="field">
                                <label>Description</label>
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
            </div>
        )
    }
}