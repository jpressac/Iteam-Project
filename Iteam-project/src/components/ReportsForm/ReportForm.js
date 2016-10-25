/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component,PropTypes} from 'react'
//import PDFDocument from 'pdfkit'
import { connect } from 'react-redux';
import axios from 'axios';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportForm.scss';
import BootstrapModal from '../BootstrapModal/BootstrapModal'
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
      meetingTopic:'',
      meetingDescription:'',
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
  }).then(
    function (response) {
      debugger;
      console.log('Report information' + response.data);
      this.generateHTML.bind(this,response.data);

    }.bind(this)).catch(
  function (response) {
    this.setState({message: '¡Your report could not be generated!'});
    this.refs.mymodal.openModal();
  }.bind(this))
  }

  generateHTML(data){
    let reportJson = JSON.parse(data);
    let topic = reportJson["topic"];
    let description = reportJson["description"];
    let ideas = reportJson["ideas"];

    this.setState({meetingTopic:topic, meetingDescription:description, meetingIdeas:ideas});
    return reportJson;
  }
  render() {
    return(
      <div>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
        <Button label='Reports bar' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} className={classes.drawer}
              type="left"
              onOverlayClick={this.handleToggle}>
          <h2>Report options</h2>
          < Button label="Basic report" raised accent onClick={this.generateRankingReport.bind(this)}/>
        </Drawer>
        <div id="reportHTML">
          <h1>{this.state.meetingTopic}</h1>
          <h2>{this.state.meetingDescription}</h2>
          <p> {this.state.meetingIdeas[0]}</p>
        </div>
      </div>
    );
  }
}

ReportForm.propTypes = {
  meetingId: PropTypes.string
}

export default connect(mapStateToProps) (ReportForm);
