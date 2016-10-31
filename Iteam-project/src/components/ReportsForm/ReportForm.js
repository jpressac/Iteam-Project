/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component, PropTypes} from 'react'
//import PDFDocument from 'pdfkit'
import {connect} from 'react-redux';
import axios from 'axios';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportForm.scss';
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import Idea from './idea'
/*
 var report = new PDFDocument

 report.pipe(fs.createWriteStream('output.pdf'))

 report.font('fonts/PalatinoBold.ttf')
 .fontSize(25)
 .text('Meeting report', 100, 100)
 report.end()
 */

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
      meetingIdeas: []
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  generateRankingReport = () => {
    axios.get('http://localhost:8080/meeting/report', {
      params: {
        meetingId: this.props.meetingId
      }
    }).then(function (response) {
      this.generateHTML(response.data);
    }.bind(this)).catch(function (response) {
      this.setState({message: '¡Your report could not be generated!'});
      this.refs.mymodal.openModal();
    }.bind(this))
  }

  filterLabels() {
    return this.state.filters.map(function (filter, index) {
      return (
        <span className="tag label label-info" style={{fontSize: 14, margin: 10, marginTop: 50}}>
          <span key={index}> {filter.field} : {filter.values}</span>
          <a href='javascript:;' onClick={this.deleteFilter.bind(this, index)}>
            <i className="remove glyphicon glyphicon-remove-sign glyphicon-white"/>
          </a>
        </span>
      );
    }.bind(this));
  }

  generateHTML(data) {
    let topic = data["topic"];
    let description = data["description"];
    let ideas = data["ideas"];

    this.setState({meetingTopic: topic, meetingDescription: description, meetingIdeas: ideas});
  }

  getIdeas() {
    let json = JSON.stringify(this.state.meetingIdeas);
    console.log('ideas ' + json);


    return this.state.meetingIdeas.map(function (idea, index) {
      return (
        <Idea postion={index} title={idea["title"]} content={idea["subtitle"]} ranking={idea["ranking"]} author={idea["username"]} > 
          </Idea>
      );
    }.bind(this));
  }

  render() {
    return (
      <div style={{marginTop:70}}>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
        <Button label='Reports bar' raised accent onClick={this.handleToggle}/>
        <Drawer active={this.state.active} theme={classes}
                type="left"
                onOverlayClick={this.handleToggle}>
          <h2>Report options</h2>
          < Button label="Basic report" raised accent onClick={this.generateRankingReport}/>
        </Drawer>
        <div id="reportHTML" >
          <h1>MEETING TOPIC: {this.state.meetingTopic}</h1>
          <h2>DESCRIPTION: {this.state.meetingDescription}</h2>
          <div> {this.getIdeas()}</div>
        </div>
      </div>
    );
  }
}

ReportForm.propTypes = {
  meetingId: PropTypes.string
}

export default connect(mapStateToProps)(ReportForm);
