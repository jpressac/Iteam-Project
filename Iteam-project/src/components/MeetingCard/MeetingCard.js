import React, {Component, PropTypes}  from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Card, CardTitle, CardActions} from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button'
import  card from './Card.scss'
import divCss from '../MeetingsHistoryForm/formContainer.scss'
import getUUID from '../../constants/utils/GetUUID'
import {saveMeetingInfoForReports} from '../../redux/reducers/Report/ReportConfigReducer'
import {PATHS} from '../../constants/routes'
import ButtonComponent from '../ButtonComponent/ButtonComponent'


const mapDispatchToProps = (dispatch) => ({
  updateMyMeeting: (meetingId) => dispatch(saveMeetingInfoForReports(meetingId)),
  goToReportsPage: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
});

class MeetingCard extends Component {

  constructor(props) {
    super(props);
  }

  renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})
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
    return (
      <div className={divCss.cardsdiv}>
        {
          Object.keys(meetings).map((key) => {
            return (
              <Card key={getUUID()} theme={card}>
                <CardTitle className="col-md-3" title='Name' subtitle={meetings[key].topic}/>
                <CardTitle className="col-md-3" title='Organizer' subtitle={meetings[key].ownerName}/>
                <CardTitle className="col-md-3" title='Date' subtitle={this.renderDate(meetings[key].endDate)}/>
                <CardActions className="col-md-3">
                  <ButtonComponent onClick={this.viewReports.bind(this, meetings[key])}
                                   value="View Reports"  />

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
