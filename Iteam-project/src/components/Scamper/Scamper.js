import React, {Component, PropTypes}  from "react";
import classes from './Scamper.scss'


class Scamper extends Component {

  constructor(props){
    super(props)
    this.state = {
      notes: {}
    }
  }


  componentWillMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(Object.keys(this.props.notes).length < Object.keys(nextProps.notes).length){
      this.setState({notes: nextProps.notes})
    }
  }

  render() {
    return (
      <div className="container" >
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>S</label>
              <label className={classes.letterRetro} >(substitute)</label>
              {this.props.renderNotes(this.state.notes, 'substitute', this.props.user)}
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>C</label>
              <label className={classes.letterRetro}>(combine)</label>
              {this.props.renderNotes(this.state.notes, 'combine', this.props.user)}
            </div>
          </div>

          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>A </label>
              <label className={classes.letterRetro}>(adapt)</label>
              {this.props.renderNotes(this.state.notes, 'adapt', this.props.user)}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>M </label>
              <label className={classes.letterRetro}>(modify)</label>
              {this.props.renderNotes(this.state.notes, 'modify', this.props.user)}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>P </label>
              <label className={classes.letterRetro}>(put to other use)</label>
              {this.props.renderNotes(this.state.notes, 'put to others use', this.props.user)}

            </div>
          </div>

          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>E </label>
              <label className={classes.letterRetro}>(eliminate)</label>
              {this.props.renderNotes(this.state.notes, 'eliminate', this.props.user)}

            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>R </label>
              <label className={classes.letterRetro}>(rearrange)</label>
              {this.props.renderNotes(this.state.notes, 'rearrange', this.props.user)}

            </div>
          </div>
      </div>)
  }
}
Scamper.propTypes = {
  user: PropTypes.string,
  notes: PropTypes.any,
  renderNotes: PropTypes.func
};


export default Scamper;
