/**
 * Created by Usuario on 05/02/2017.
 */

import React, {Component, PropTypes} from 'react';
import InboxList from './InboxList';
import TaskSchedulerCreator from '../../utils/TaskSchedulerCreator'
import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'
import {updateMeetingsViewed} from '../../utils/actions/meetingActions'
import classes from './InboxStyle.scss';
import {connect} from "react-redux";
import {IconButton, Button} from 'react-toolbox/lib/button';


class Inbox extends Component {

  constructor(props) {
    super(props);
  }
  
  componentWillUnmount(){
    updateMeetingsViewed(this.props.user, this.prop.meetings);
  }
  

  render() {
    return (
      <div>
        <InboxList
          meetings={this.state.meetings}>
        </InboxList>
      </div>
    )
  }
}

Inbox.propTypes = {
  user: PropTypes.any,
  meetings: PropTypes.any

};

export default Inbox
