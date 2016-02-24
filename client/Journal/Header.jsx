import React from 'react';
import { browserHistory } from 'react-router';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';

import Popover from 'material-ui/lib/popover/popover';
import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';

import TextField from 'material-ui/lib/text-field';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            searchOpen: false
        };
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

    openSearch(event) {
        event.preventDefault();
        this.setState({
            searchOpen: true,
            searchAnchor: event.currentTarget
        });
    }

    closeSearch() {
        this.setState({
            searchOpen: false
        });
    }

    newEntry() {
       console.log("NEW ENTRY");
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup float="left" firstChild={true}>
                    <RaisedButton label="New Entry" primary={true} onTouchTap={this.newEntry.bind(this)}/>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <IconButton onTouchTap={this.openSearch.bind(this)}><SearchIcon onTouchTap={this.openSearch.bind(this)} /></IconButton>
                    <Popover open={this.state.searchOpen}
                             anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                             targetOrigin={{horizontal: 'left', vertical: 'top'}}
                             anchorEl={this.state.searchAnchor}
                             onRequestClose={this.closeSearch.bind(this)}>
                        <TextField
                            style={{paddingLeft: '5px', paddingRight: '5px'}}
                            hintText="Enter Journal"
                            floatingLabelText="Search"
                            fullWidth={true}
                            value={this.state.searchValue}
                            onChange={this.handleSearch.bind(this)}
                            onEnterKeyDown={this.submitSearch.bind(this)}
                        />
                        <RaisedButton label="Search" onTouchTap={this.submitSearch.bind(this)} />
                    </Popover>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}