import React, {Component} from "react";
import classes from './Spinner.scss'
import ProgressBar from 'react-toolbox/lib/progress_bar';


class Spinner extends Component {

  render() {
    return (
      <div className={classes.content}>
        <p style={{margin: '5px auto'}} />
        <ProgressBar type='circular' mode='indeterminate' multicolor/>
      </div>
    );
  }
}

export default Spinner;
