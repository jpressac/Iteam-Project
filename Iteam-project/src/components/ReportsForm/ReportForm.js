/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component, PropTypes} from 'react'
import jsPDF from 'jspdf'
import {connect} from 'react-redux';
import axios from 'axios';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportForm.scss';
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import buttonBasic from './buttonBasic.scss'
import buttonPdf from './buttonPdf.scss'
import {MEETING} from '../../constants/HostConfiguration'
import D3Tree from './D3tree/D3Tree'
import D3ChartTree from './D3ChartTree/D3ChartTree'

const report = new jsPDF()

var specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  }
};

const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId,
      meetingConfiguration: state.meetingConfigurationReducer.meeting.config
    }
  }
};

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      meetingTopic: '',
      meetingDescription: '',
      meetingIdeas: [],
      selectedReport: '',
      treeData: {},
      ranking: false
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  generateRankingReport = () => {

    axios.get(MEETING.MEETING_REPORT, {
      params: {
        meetingId: this.props.meetingId,
        tags:this.props.meetingConfiguration.tags.toString()
      }
    }).then(function (response) {

      this.setState({treeData: response.data, ranking:true});

    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    }.bind(this))
  };

  generateUserReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_USER, {
      params: {
        meetingId: this.props.meetingId,
        tags:this.props.meetingConfiguration.tags.toString()
      }
    }).then(function (response) {
      this.setState({treeData: response.data, ranking:false});


    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    });
  };

  generateTagReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_TAG, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString()
      }
    }).then(function (response) {
      this.setState({treeData: response.data, ranking:false});
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generatePDF = () => {
    report.fromHTML(document.getElementById('reportHTML').innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    report.save('report.pdf');
  };

  renderTrees() {

    if (this.state.ranking) {
      return (
        <D3ChartTree treeData={this.state.treeData}/>
      )
    } else {
      return (
        <D3Tree treeData={this.state.treeData}/>
      )
    }

  }

  render() {
    return (
      <div style={{marginTop: 70}}>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
        <Button label='Reports bar' theme={buttonBasic} style={{color: 'white'}} onClick={this.handleToggle}/>
        <Drawer active={this.state.active}
                type="left"
                onOverlayClick={this.handleToggle}>
          <label className={classes.reportTitle}>Report options</label>
          <div>
            < Button label="Ideas by ranking" icon='star' theme={buttonPdf} style={{color: 'white'}}
                     onClick={this.generateRankingReport} active/>
            < Button label="Ideas by user" icon='group' theme={buttonPdf} style={{color: 'white'}}
                     onClick={this.generateUserReport.bind(this)}/>
            < Button label="Ideas by tag" icon='lightbulb_outline' theme={buttonPdf} style={{color: 'white'}}
                     onClick={this.generateTagReport}/>
            < Button label="Download PDF" icon='get_app' style={{color: 'white'}} theme={buttonPdf}
                     onClick={this.generatePDF}/>
          </div>
        </Drawer>
        <div id="reportHTML">
          {this.renderTrees()}
        </div>
      </div>
    );
  };
}

ReportForm.propTypes = {
  meetingId: PropTypes.string,
  meetingConfiguration: PropTypes.any
};

export default connect(mapStateToProps)(ReportForm);
