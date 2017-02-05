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


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meetingsNotViewed: '',
      showMeetingList: false,
      count: 0
    }
  }

  componentWillMount() {
    new TaskSchedulerCreator(60000, this.meetingsNotViewed.bind(this));
  }

  meetingsNotViewed() {
    axios.get(MEETING.MEETING_NOT_VIEWED, {
      params: {username: this.props.user}
    }).then((response)=> {
      this.setState({
        meetingsNotViewed: response.data,
        count: response.data.length
      })
    })
  }

  onChangeSize() {
    if (this.state.showMeetingList) {
      updateMeetingsViewed(this.props.user, this.state.meetingsNotViewed);
    }

    this.setState({
      showMeetingList: !this.state.showMeetingList,
      count: 0
    })
  }

  renderMeetingList() {
    return (
      <div className={classes.chatContainerMax} onClick={this.onChangeSize.bind(this)}>
        <InboxList
          meetings={this.state.meetingsNotViewed}>
        </InboxList>
      </div>
    )
  }

  renderNotification() {
    return (
      <div className={classes.chatContainerMin}>
        <div className={classes.msgWgtHeaderMin} onClick={this.onChangeSize.bind(this)}>Inbox
          <IconButton icon={this.state.expandButton} style={{float: 'right'}} onClick={this.onChangeSize.bind(this)}/>
          <Button label={this.state.count.toString()} style={{background:'yellow', color:'black', float:'left'}} mini
                  floating disabled/>
        </div>
      </div>
    )

  }

  render() {
    if (this.state.showMeetingList) {
      return this.renderMeetingList();
    }
    else {
      return this.renderNotification();
    }
  }
}

Inbox.propTypes = {
  user: PropTypes.any,
  meetings: PropTypes.any

};

export default connect(mapStateToProps)(Inbox)
