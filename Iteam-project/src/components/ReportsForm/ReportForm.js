import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportForm.scss';
import BootstrapModal from '../BootstrapModal/BootstrapModal';
import buttonBasic from './buttonBasic.scss';
import buttonPdf from './buttonPdf.scss';
import {MEETING, REPORT} from '../../constants/HostConfiguration';
import D3Tree from './D3tree/D3Tree';
import D3ChartTree from './D3ChartTree/D3ChartTree';
import Spinner from '../Spinner/Spinner';
import {generateSharedReport} from '../../utils/actions/reportActions'


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
      ranking: false,
      showSpinner: false,
      message: ''
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  generateRankingReport = () => {

    this.setState({showSpinner: true});
    axios.get(MEETING.MEETING_REPORT, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {

      this.setState({showSpinner: false}, () => {
        this.setState({treeData: response.data, ranking: true});
      });

    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generateUserReport = () => {
    this.setState({showSpinner: true});

    axios.get(REPORT.MEETING_REPORT_BY_USER, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {
      this.setState({showSpinner: false}, () => {
        this.setState({treeData: response.data, ranking: false});
      });

    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generateTagReport = () => {

    this.setState({showSpinner: true});

    axios.get(MEETING.MEETING_REPORT_BY_TAG, {
      params: {
        meetingId: this.props.meetingId,
        tags: this.props.meetingConfiguration.tags.toString().toLowerCase()
      }
    }).then(function (response) {
      this.setState({showSpinner: false}, () => {
        this.setState({treeData: response.data, ranking: false});
      });
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
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

  generateURLForSharedReport() {
    generateSharedReport(["7f1cad80-9517-4279-aa67-1d340c193162", "cb0e9836-fc10-46d2-9b88-5e2299bc1049", "7b63f70e-2a42-427b-b496-5c9b74af2b6b"])
      .then((response) => {
      console.log('hola puto')
        this.setState({message: 'Be Creative share the given report: ' + response.data});
        this.refs.reportModal.openModal();
      })
      .catch((response) => {
        console.log(response)
      })
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div>
          <BootstrapModal ref="reportModal" message={this.state.message}/>
          <Button label='Reports bar' theme={buttonBasic} style={{color: 'white'}} onClick={this.handleToggle}/>
          <Drawer active={this.state.active}
                  type="left"
                  onOverlayClick={this.handleToggle}>
            <label className={classes.reportTitle}>Report options</label>
            <div>
              < Button label="Ideas by ranking" icon='star' theme={buttonPdf}
                       onClick={this.generateRankingReport} active/>
              < Button label="Ideas by user" icon='group' theme={buttonPdf} style={{color: 'white'}}
                       onClick={this.generateUserReport.bind(this)}/>
              < Button label="Ideas by tag" icon='lightbulb_outline' theme={buttonPdf} style={{color: 'white'}}
                       onClick={this.generateTagReport}/>
            </div>
          </Drawer>
          <div id="reportHTML">
            {this.renderTrees()}
            <button onClick={this.generateURLForSharedReport.bind(this)}>
              Shared Report
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <Spinner/>
      )
    }
  };
}

ReportForm.propTypes = {
  meetingId: PropTypes.string,
  meetingConfiguration: PropTypes.any
};

export default connect(mapStateToProps)(ReportForm);
