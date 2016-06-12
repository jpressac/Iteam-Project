import React, {Component,PropTypes} from 'react';
import classes from './AboutView.scss'


class AboutView extends React.Component {

  render(){
    return(
      <div>
      <div className={classes.label}>
      <label for="about"> ABOUT US </label>
</div>
          <div className={classes.formContent}>
          <label className={"control-label"}> VAL write the text darling :) </label>
          </div>
          </div>

);
};
}

export default AboutView
