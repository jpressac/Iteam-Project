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


var tree =
  {

    "name": "First Meeting",
    "children": [{
      "name": "Rock",
      "children": [{
        "name": "Jesus Of Suburbia", "value": 5, "color": "#D6BA33"
      }, {
        "name": "American Idiot", "value": 3, "color": "#D6BA33"
      }, {
        "name": "Boulevard Of Broken Dreams", "value": 4, "color": "#D6BA33"
      }]
    }, {
      "name": "Pop",
      "children": [{
        "name": "Clocks", "value": 3.5, "color": "#D6BA33"
      }, {
        "name": "The Scientist", "value": 4, "color": "#D6BA33"
      }, {
        "name": "Vive la vida", "value": 2, "color": "#D6BA33"
      }, {
        "name": "I'm blue", "value": 4.5, "color": "#D6BA33"
      }, {
        "name": "The afternoon", "value": 2.5, "color": "#D6BA33"
      }, {
        "name": "Baby now", "value": 5, "color": "#D6BA33"
      }]
    }]


  };

var specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  }
};

const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId
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
    this.setState({ranking:true});


    //this.setState({treeData: response.data, ranking:false});

    // axios.get(MEETING.MEETING_REPORT, {
    //   params: {
    //     meetingId: this.props.meetingId
    //   }
    // }).then(function (response) {
    //   this.setState({selectedReport: '3'});
    //   this.generateHTML(response.data);
    // }.bind(this)).catch(function (response) {
    //   this.setState({message: '¡Your report could not be generated!'});
    //   this.refs.mymodal.openModal();
    // }.bind(this))
  };

  generateUserReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_USER, {
      params: {
        meetingId: this.props.meetingId,
        tags: "Color, Type, Size"
      }
    }).then(function (response) {
      this.setState({treeData: response.data, ranking:false});

      treeData = response.data
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    });
  };

  generateTagReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_TAG, {
      params: {
        meetingId: this.props.meetingId,
        tags: "Color, Type, Size"
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
        <D3ChartTree treeData={tree}/>
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
  meetingId: PropTypes.string
};

export default connect(mapStateToProps)(ReportForm);
