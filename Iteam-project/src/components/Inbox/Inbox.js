import React, {Component, PropTypes} from 'react';
import InboxList from './InboxList';
import classes from './InboxStyle.scss';
import {updateMeetingsViewed} from '../../utils/actions/meetingActions'

class Inbox extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    updateMeetingsViewed(this.prop.meetings);
  }


  render() {
    console.debug('Entra a Inbox');
    console.debug(this.props.meetings);
    return (
      <div>
        <InboxList
          meetings={this.props.meetings}>
        </InboxList>
      </div>
    )
  }
}

Inbox.propTypes = {
  meetings: PropTypes.any
};

export default Inbox
