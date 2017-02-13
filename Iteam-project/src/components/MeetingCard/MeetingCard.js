import React, {Component, PropTypes}  from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button'
import {saveMeetingIdViewReports} from '../../redux/reducers/Report/ViewReportReducer'
import  card from './Card.scss'
import divCss from '../MeetingsHistoryForm/formContainer.scss'
import generateUUID from '../../constants/utils/GetUUID'
import {PATHS} from '../../constants/routes'

const mapDispatchToProps = (dispatch) => ({
  updateMyMeetingId: (meetingId) => dispatch(saveMeetingIdViewReports(meetingId)),
  viewReports: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
});

class MeetingCard extends Component {

  constructor(props) {
    super(props);
  }

  renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})
  }

  viewReports(meetingId) {
    console.log('Meeting Id' + meetingId)
    this.props.updateMyMeetingId(meetingId)
    this.props.viewReports()
  }

  render() {
    let meetings = this.props.endedMeetings;
    console.log(this.props.endedMeetings)
    return (
      <div className={divCss.cardsdiv}>
        {
          Object.keys(meetings).map((key) => {
            return (
              <Card theme={card} key={generateUUID()}>
                <CardTitle className="col-md-3" title='Name' subtitle={meetings[key].topic}/>
                <CardTitle className="col-md-3" title='Organizer' subtitle={meetings[key].ownerName}/>
                <CardTitle className="col-md-3" title='Date' subtitle={this.renderDate(meetings[key].endDate)}/>
                <CardActions className="col-md-3">
                  <Button label="View reports" onClick={this.viewReports.bind(this, meetings[key].meetingId)}/>
                </CardActions>
                <CardTitle className="col-md-12" title='Description' subtitle={meetings[key].description}/>
              </Card>
            );
          })
        }
      </div>);
  }
}
MeetingCard.propTypes = {
  endedMeetings: PropTypes.any,
  updateMyMeetingId: PropTypes.func,
  viewReports: PropTypes.func
};

export default connect(null, mapDispatchToProps)(MeetingCard);
