import React, {Component, PropTypes}  from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Card, CardTitle, CardActions} from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button'
import  card from './Card.scss'
import divCss from '../MeetingsHistoryForm/formContainer.scss'
import getUUID from '../../constants/utils/GetUUID'
import {saveMeetingConfig} from '../../redux/reducers/Meeting/MeetingConfigReducer'
import {PATHS} from '../../constants/routes'

const mapDispatchToProps = (dispatch) => ({
  updateMyMeeting: (meetingId) => dispatch(saveMeetingConfig(meetingId)),
  goToReportsPage: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
});

class MeetingCard extends Component {

  constructor(props) {
    super(props);
  }

  static renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  }

  viewReports(meeting) {

    console.log(meeting)
    this.props.updateMyMeeting({
      'meetingId': meeting.meetingId,
      'topic': meeting.topic,
      'ownerName': meeting.ownerName,
      'meetingConfig': meeting.meetingConfig
    });
    this.props.goToReportsPage()
  }

  render() {
    let meetings = this.props.endedMeetings;
    console.log(meetings)

    return (
      <div className={divCss.cardsdiv}>
        {
          Object.keys(meetings).map((key) => {
            return (
              <Card key={getUUID()} theme={card}>
                <CardTitle className="col-md-3" title='Name' subtitle={meetings[key].topic}/>
                <CardTitle className="col-md-3" title='Organizer' subtitle={meetings[key].ownerName}/>
                <CardTitle className="col-md-3" title='Date' subtitle={MeetingCard.renderDate(meetings[key].endDate)}/>
                <CardActions className="col-md-3">
                  <Button label="View reports" onClick={this.viewReports.bind(this, meetings[key])}/>
                </CardActions>
                <CardTitle className="col-md-12" title='Description' subtitle={meetings[key].description}/>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

MeetingCard.propTypes = {
  endedMeetings: PropTypes.any,
  updateMyMeeting: PropTypes.func,
  goToReportsPage: PropTypes.func
};

export default connect(null, mapDispatchToProps)(MeetingCard);
