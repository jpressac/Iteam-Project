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
    console.log(this.props.clients);
    console.log(JSON.stringify(this.props.clients));
    let participants = this.props.clients;
    return (
      <List selectable ripple>
        <ListSubHeader caption={this.props.teamName}/>
        {Object.keys(participants).map((key) => {
          console.log('key: ' + participants[key].username);
          console.log('key: ' + participants[key].status);
          return(
              <ListItem
                avatar={avatar}
                caption={participants[key].username}
                legend={participants[key].status}
                rightIcon='person'/>
            );
        })}
      </List>
    );
  }

//{this.props.clients.map(this.renderClient)}
  renderClient = client => (<ListItem
        key={client}
        avatar={avatar}
        caption={client.username}
        legend={client.status}
        rightIcon='person'/>
    );

}

Clients.propTypes = {
  clients: PropTypes.array,
  teamName:PropTypes.string
};



export default Clients;
