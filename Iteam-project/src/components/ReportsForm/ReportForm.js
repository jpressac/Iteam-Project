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

const report = new jsPDF()

var specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  }
};



/*const mapStateToProps = state => ({
 meetingId: state.meetingId
 });
 */
const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId
    }
  }
}

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      meetingTopic: '',
      meetingDescription: '',
      meetingIdeas: [],
      selectedReport: ''
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
    axios.get('http://localhost:8080/meeting/report/byuser', {
      params: {
        meetingId: this.props.meetingId
      }
    }).then(function (response) {
      this.setState({selectedReport: '2'});
      this.generateHTML(response.data);
    }.bind(this)).catch(function (response) {
      this.setState({message: '¡Your report could not be generated!'});
      this.refs.mymodal.openModal();
    }.bind(this))
    };

    generateTagReport = () => {
      axios.get('http://localhost:8080/meeting/report/bytag', {
        params: {
          meetingId: this.props.meetingId
        }
      }).then(function (response) {
        this.setState({selectedReport: '1'});
        this.generateHTML(response.data);
      }.bind(this)).catch(function (response) {
        this.setState({message: '¡Your report could not be generated!'});
        this.refs.mymodal.openModal();
      }.bind(this))
    };

  generateHTML(data){
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
        <Idea postion={index} reportType={this.state.selectedReport} title={idea["title"]} content={idea["subtitle"]} ranking={idea["ranking"]} author={idea["username"]} comments={idea["comments"]} tag={idea["tag"]} >
          </Idea>
      );
    }.bind(this));
  }

  generatePDF =() => {
    report.fromHTML(document.getElementById('reportHTML').innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    report.save('report.pdf');
  };

  render() {
    return (
      <div style={{marginTop:70}}>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
        <Button label='Reports bar' theme={buttonBasic}style={{color:'white'}} onClick={this.handleToggle}/>
        <Drawer active={this.state.active}
                type="left"
                onOverlayClick={this.handleToggle}>
          <label className={classes.reportTitle}>Report options</label>
          <div>
          < Button label="Ideas by ranking"  icon='star' theme={buttonPdf} style={{color:'white'}} onClick={this.generateRankingReport} active/>
          < Button label="Ideas by user" icon='group' theme={buttonPdf} style={{color:'white'}}  onClick={this.generateUserReport}/>
          < Button label="Ideas by tag" icon='lightbulb_outline' theme={buttonPdf} style={{color:'white'}} onClick={this.generateTagReport}/>
          < Button label="Download PDF" icon='get_app' style={{color:'white'}} theme={buttonPdf} onClick={this.generatePDF}/>
            </div>
        </Drawer>
        <div id="reportHTML" >
          <div className={classes.container} style={{marginTop:30}}>
          <div className={classes.topic}>
          <label> {this.state.meetingTopic}</label>
            </div>
          <div className={classes.description}>
          <label>{this.state.meetingDescription}</label>
            </div>
        </div>
          <div className={classes.content}> {this.getIdeas()}</div>
        </div>
      </div>
    );
  };
}

ReportForm.propTypes = {
  meetingId: PropTypes.string
}

export default connect(mapStateToProps)(ReportForm);
