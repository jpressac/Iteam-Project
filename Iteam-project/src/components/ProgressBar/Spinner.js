import React, {Component, PropTypes} from "react";
import ProgressBar from 'react-toolbox/lib/progress_bar';


class Spinner extends Component {

  render() {
    return (
      <div>
        <p style={{margin: '5px auto'}}>Circular</p>
        <ProgressBar type='circular' mode='indeterminate' multicolor/>
      </div>
    );
  }
}


Spinner.propTypes = {};

export default Spinner;
