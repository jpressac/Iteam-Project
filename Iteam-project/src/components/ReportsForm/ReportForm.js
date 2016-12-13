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
import Idea from './idea'
import buttonBasic from './buttonBasic.scss'
import buttonTag from './buttonTag.scss'
import buttonUser from './buttonUser.scss'
import buttonPdf from './buttonPdf.scss'
import {MEETING} from '../../constants/HostConfiguration'
import D3Tree from './D3tree/D3Tree'

const report = new jsPDF()

var treeData = {};


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
      treeData: {}
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  generateRankingReport = () => {
    axios.get(MEETING.MEETING_REPORT, {
      params: {
        meetingId: this.props.meetingId
      }
    }).then(function (response) {
      this.setState({selectedReport: '3'});
      this.generateHTML(response.data);
    }.bind(this)).catch(function (response) {
      this.setState({message: '¡Your report could not be generated!'});
      this.refs.mymodal.openModal();
    }.bind(this))
  };

  generateUserReport = () => {
    axios.get(MEETING.MEETING_REPORT_BY_USER, {
      params: {
        meetingId: this.props.meetingId,
        tags: "Color, Type, Size"
      }
    }).then(function (response) {

      console.log("json report " + JSON.stringify(response.data));
      console.log(response.data);

      this.setState({treeData: response.data});

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

      console.log("json report " + JSON.stringify(response.data));
      console.log("object report " + response.data);

      this.setState({treeData: response.data});
    }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })
  };

  generateHTML(data) {
    let topic = data["topic"];
    let description = data["description"];
    let ideas = data["ideas"];

    this.setState({meetingTopic: topic, meetingDescription: description, meetingIdeas: ideas});
  }

  getIdeas() {
    let json = JSON.stringify(this.state.meetingIdeas);
    console.log('ideas ' + json);
    console.log('selected report' + this.state.selectedReport);

    return this.state.meetingIdeas.map(function (idea, index) {
      return (
        <Idea postion={index} reportType={this.state.selectedReport} title={idea["title"]} content={idea["subtitle"]}
              ranking={idea["ranking"]} author={idea["username"]} comments={idea["comments"]} tag={idea["tag"]}>
        </Idea>
      );
    }.bind(this));
  }

  generatePDF = () => {
    report.fromHTML(document.getElementById('reportHTML').innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    report.save('report.pdf');
  };

  renderTree(){
    let tree = this.state.treeData;
    console.log(tree);
    return (
      <D3Tree treeData={tree}/>
    )
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
          {this.renderTree()}
        </div>
      </div>
    );
  };
}

ReportForm.propTypes = {
  meetingId: PropTypes.string
};

export default connect(mapStateToProps)(ReportForm);
