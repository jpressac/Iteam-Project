/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component,PropTypes} from 'react'
//import PDFDocument from 'pdfkit'
import { connect } from 'react-redux';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
/*

var report = new PDFDocument

report.pipe(fs.createWriteStream('output.pdf'))

report.font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Meeting report', 100, 100)
report.end()
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
        <Drawer active={this.state.active}
              type="left"
              onOverlayClick={this.handleToggle}>
          <h2>Report options</h2>
        </Drawer>
      </div>
    );
  }
}

export default ReportForm;
