/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component, PropTypes} from "react";
import jsPDF from "jspdf";
import {connect} from "react-redux";
import axios from "axios";
import classes from "./ReportsPageForm.scss";
import {MEETING} from "../../constants/HostConfiguration";
import D3Tree from "../ReportsForm/D3tree/D3Tree";
import D3ChartTree from "../ReportsForm/D3ChartTree/D3ChartTree";
import Spinner from "../Spinner/Spinner";
import {PATHS} from './../../constants/routes';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import {push} from 'react-router-redux';


const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId,
      user: state.loginUser.user.username,
      meetingConfiguration: state.meetingConfigurationReducer.meeting.config,
      reportType: state.reportReducer
    }
  }
};
const mapDispatchToProps = dispatch => ({
  report: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
});
class ReportsPageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {},
      ranking: false,
      showSpinner: false

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('state');
    console.log(this.state);
    console.log('nexSstate');
    console.log(nextState);
    return this.props.reportType != nextProps.reportType
      || Object.keys(this.state.treeData).length != Object.keys(nextState.treeData).length || this.state.ranking != nextState.ranking
  }

  generateReport(reportType) {
    switch (reportType) {
      case 'byranking':
        this.setState({ranking: true});
        this.generateRankingReport();
        break;
      case 'byuser':
        this.setState({ranking: false});
        this.generateUserReport();
        break;
      case 'bytag':
        this.setState({ranking: false});
        this.generateTagReport();
        break;
    }
  }

  generateUserReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_USER, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {
      this.setState({treeData: response.data});
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generateTagReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_TAG, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {
      this.setState({treeData: response.data});
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generateRankingReport = () => {
    axios.get(MEETING.MEETING_REPORT, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {
      this.setState({treeData: response.data});
    }.bind(this)).catch(function (response) {
      //TODO: what we do here???? WTF
    })
  };

  renderTrees() {
    if (this.state.ranking) {

      return (
        <D3ChartTree treeData={this.state.treeData} />
      )
    } else {
      return (
        <D3Tree treeData={this.state.treeData} technic={this.props.meetingConfiguration.technic} type={this.props.reportType}/>
      )
    }
  }
  titleByReport(reportType){
    switch (reportType) {
      case 'byranking':
       return(
         <label className={classes.title}> Report By Ranking</label>
       );
        break;
      case 'byuser':
        return(
          <label className={classes.title}> Report By User</label>
        );
        break;
      case 'bytag':
        return(
          <label className={classes.title}> Report By Tag</label>
        );
        break;
    }
  }

  render() {

    return (
      <div className="container" style={{marginTop: 80}}>
        {this.titleByReport(this.props.reportType)}
        {this.renderTrees()}
        {this.generateReport(this.props.reportType)}
        <ButtonComponent className="col-md-4" value='BACK TO REPORT' raisedValue
                         onClick={this.props.report} iconButton='backspace'/>
      </div>

    );

  };
}

ReportsPageForm.propTypes = {


  reportType: PropTypes.string,
  user: PropTypes.any,
  meetingId: PropTypes.string,
  meetingConfiguration: PropTypes.any,
  report: PropTypes.func

};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPageForm)
