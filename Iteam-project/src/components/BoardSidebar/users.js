import { connect } from 'react-redux';
import React, {Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import avatar from './generic-avatar.png';

//TODO const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;

class User extends Component {

  constructor(props) {
    super(props);
  }
}
const renderClient = client => (
  <ListItem
    key={client}
    avatar={avatar}
    caption={client.username}
    legend={client.status}
    rightIcon='person'
  />
);

const Clients = () => (
  <List selectable ripple>
    <ListSubHeader caption={this.props.teamName} />
    {this.props.clients.map(renderClient)}
  </List>
);

Clients.propTypes = {
  clients: PropTypes.array,
  teamName:PropTypes.string
};

Clients.defaultProps = {
  clients: [],
  teamName:''
};

export default (Clients);
