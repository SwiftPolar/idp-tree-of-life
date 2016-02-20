import React from 'react';

export class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            query: props.location.query
        }
    }

    test() {
        alert("TEST!");

    }

    render() {
        console.log(this.state.id);
        console.log(this.state.query);
        return (
            <div>
                This is about page!<br/>
                <button onClick={this.test.bind(this)}>Test</button>
            </div>
        );
    }
}