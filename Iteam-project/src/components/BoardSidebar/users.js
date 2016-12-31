import { connect } from 'react-redux';
import React, {Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import avatar from './generic.png';
import avatar2 from './account-circle (1).png';

//TODO const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;

class Clients extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let participants = this.props.clients;
    return (
      <List selectable ripple>
        <ListSubHeader caption={this.props.teamName}/>
        {Object.keys(participants).map((key) => {
          let img = avatar;
          if(participants[key].status === 'Online'){
            img = avatar2;
          }
          return(
              <ListItem
                avatar={img}
                caption={participants[key].username}
                legend={participants[key].status}
                rightIcon='person'/>
            );
        })}
      </List>
    );
  }
}

Clients.propTypes = {
  clients: PropTypes.array,
  teamName:PropTypes.string
};



export default Clients;
