import React, {Component, PropTypes} from 'react'
import {getSlackAndNonSlackUsers} from '../../utils/actions/slackActions'
import {connect} from 'react-redux'
import {List, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import Spinner from '../Spinner/Spinner'

const mapStateToProps = (state) => {
  return {
    meetingInfo: state.meetingReducer.meeting
  }
};

class MeetingSlackUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slackUsersList: [],
      nonSlackUsers: [],
      showSpinner: true
    }
  }

  componentWillMount() {
    getSlackAndNonSlackUsers(this.props.meetingInfo.teamName).then(function (response) {
      this.fillState(response.data);
    }.bind(this));
  }

  fillState(data) {
    this.setState({
      slackUsersList: data.usersInSlack,
      nonSlackUsers: data.usersWithoutSlack,
      showSpinner: false
    });
  }

  render() {
    if(!this.state.showSpinner) {
      let slackUsers = this.state.slackUsersList;
      let nonSlackUsers = this.state.nonSlackUsers;
      return (
        <div className={"container " + cssClasses.containerForm}>
          <div className={cssClasses.labelMainTitle}>
            <label>SLACK INFORMATION</label>
            <div className={"row " + cssClasses.form}>
              <div className="col-md-12">
                <div className="col-md-6">
                  <label>Users in Slack group</label>
                  <List selectable ripple>
                    <ListSubHeader />
                    {slackUsers.map((key) => {
                      return (
                        <ListItem
                          caption={key}
                          rightIcon='person'/>
                      );
                    })}
                  </List>
                </div>
                <div className="col-md-6">
                  <label>Users not in Slack group</label>
                  <List selectable ripple>
                    <ListSubHeader />
                    {nonSlackUsers.map((key) => {
                      return (
                        <ListItem
                          caption={key}
                          rightIcon='person'/>
                      );
                    })}
                  </List>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>);
    }else {
      return (
        <Spinner />
      )
    }
  }
}
MeetingSlackUsers.propTypes = {
  meetingInfo: PropTypes.any
};

export default connect(mapStateToProps, null)(MeetingSlackUsers)

