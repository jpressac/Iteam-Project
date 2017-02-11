/**
 * Created by Usuario on 05/02/2017.
 */

import React, {Component, PropTypes} from 'react';
import InboxList from './InboxList';
import classes from './InboxStyle.scss';
import {updateMeetingsViewed} from '../../utils/actions/meetingActions'

class Inbox extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
    updateMeetingsViewed(this.prop.meetings);
  }


  render() {
    return (
      <div className={classes.InboxButton}>
        <InboxList
          meetings={this.state.meetings}>
        </InboxList>
      </div>
    )
  }
}

Inbox.propTypes = {
  meetings: PropTypes.any
};

export default Inbox
