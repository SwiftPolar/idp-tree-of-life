import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/add-a-photo';

import TextField from 'material-ui/lib/text-field';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({searchValue: event.target.value});
    }

    submitSearch(event) {
        value = this.state.searchValue;
        console.log("SUBMITTING SEARCH NOW!" + value);
        this.setState({
            searchValue: "",
            searchOpen: false
        });
    }

    getImages() {
        return (
            <div className="ui two cards">
                {this.props.images.map((obj) => (
                    <a className="card" key={obj._id} href={"/gallery/" + obj._id}>
                        <div className="image">
                            <img src={obj.image}/>
                        </div>
                        <div className="extra">
                            {obj.tag.join(" #")}
                        </div>
                    </a>
                ))}
            </div>
        );


    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <TextField
                        style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '-30px'}}
                        hintText="Enter Tag"
                        floatingLabelText="Search"
                        fullWidth={true}
                        value={this.state.searchValue}
                        onChange={this.handleSearch.bind(this)}
                        onEnterKeyDown={this.submitSearch.bind(this)}
                    />
                </div>
                <div className="ui grid container">


                    <div className="sixteen wide column row centered">
                            {this.getImages()}
                    </div>
                </div>
            </div>
        )
    }
}