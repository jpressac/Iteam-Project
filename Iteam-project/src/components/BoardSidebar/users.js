import { connect } from 'react-redux';
import React, {Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import avatar from './generic-avatar.png';

//TODO const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;

class Clients extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <List selectable ripple>
        <ListSubHeader caption={this.props.teamName}/>
        {this.renderClient(this.props.clients)}
      </List>
    );
  }

  renderClient = (clients) => {

    console.log('HOLA');
    console.log(JSON.stringify(clients));
    return clients.map(client=> {
      console.log(client.username);
      return (<ListItem
        key={client}
        avatar={avatar}
        caption={client.username}
        legend={client.status}
        rightIcon='person'
      />);
    });

  }
}

Clients.propTypes = {
  clients: PropTypes.array,
  teamName:PropTypes.string
};



export default Clients;
