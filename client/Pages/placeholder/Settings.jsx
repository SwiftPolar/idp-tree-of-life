import React from 'react';
import { browserHistory } from 'react-router';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/lib/icon-button';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const ListExampleSettings = () => (
    <div style={{marginBottom: '75px'}}>
        <Toolbar>
            <ToolbarGroup float="left" firstChild={true}>
                <IconButton onTouchTap={()=>{browserHistory.goBack()}}><BackIcon /></IconButton>
            </ToolbarGroup>
            <ToolbarGroup float="left">
                <ToolbarTitle text="Settings" />
            </ToolbarGroup>
        </Toolbar>
        <List subheader="Privacy Settings">
            <ListItem
                primaryText="Who can see your images?"
                secondaryText="Everyone"
            />
            <ListItem
                primaryText="Who can message you?"
                secondaryText="Everyone"
            />
            <ListItem
                primaryText="Edit block list"
                secondaryText="0 Users"
            />
        </List>
        <Divider />
        <List subheader="Notify me when someone">
            <ListItem primaryText="Replies to my topic" leftCheckbox={<Checkbox />}/>
            <ListItem primaryText="New chat message" leftCheckbox={<Checkbox />}/>
            <ListItem primaryText="Comments on my images" leftCheckbox={<Checkbox />}/>
        </List>
        <Divider />
        <List subheader="Third-party integrations">
            <ListItem
                primaryText="Facebook"
                secondaryText="Not connected"
            />
            <ListItem
                primaryText="Google"
                secondaryText="Not connected"
            />
        </List>


    </div>
);

export default ListExampleSettings;