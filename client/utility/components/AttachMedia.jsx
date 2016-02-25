import React from 'react';

export default class AttachMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index
        };
    }

    getImages() {
        return (
            <div className="ui three cards">
                {this.props.images.map((obj) => (
                    <div className="card" key={obj._id} onClick={this.props.onSelect.bind(this, obj._id, obj.image)}>
                        <div className="image">
                            <img src={obj.image}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="ui grid container">
                    <div className="sixteen wide column row centered">
                        {this.getImages()}
                    </div>
                </div>
            </div>
        );
    }
}

AttachMedia.propTypes = {
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func.isRequired
};

AttachMedia.defaultProps = {
    index: 1
};