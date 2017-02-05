/**
 * Created by Usuario on 05/02/2017.
 */

import React, {Component, PropTypes} from 'react';
import classes from './InboxStyle.scss';


class NewMeeting extends Component{
  
  render() {
    return (
      <div className={classes.msgRowContainer}>
        <div className={classes.msgRow}>
          <br/><p className={classes.p}>{this.props.topic}</p><br/>
        </div>
      </div>
    );
  }
}

NewMeeting.propTypes = {
  topic: PropTypes.string
};

export default NewMeeting
