/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component,PropTypes} from 'react'
//import PDFDocument from 'pdfkit'
import { connect } from 'react-redux';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportForm.scss';

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
class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };
  render() {
    return(
      <div>
        <Button label='Reports bar' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} className={classes.drawer}
              type="left"
              onOverlayClick={this.handleToggle}>
          <h2>Report options</h2>
        </Drawer>
      </div>
    );
  }
}
/*
ReportForm.propTypes = {
  meetingId: PropTypes.string
}
*/
export default ReportForm;
//export default connect(mapStateToProps) (ReportForm);
