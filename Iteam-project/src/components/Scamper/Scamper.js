import React, {Component, PropTypes}  from "react";
import classes from './Scamper.scss'
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId,
      connected: state.meetingUser,
      user: state.loginUser.user.username
    }
  }
};
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
    console.log("next props")
    console.log(nextProps)
    if(Object.keys(this.props.notes).length < Object.keys(nextProps.notes).length){
      this.setState({notes: nextProps.notes})
    }
  }

  render() {
    return (
      <div >
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>S </label>
              <label>(subtitute)</label>
              {this.props.renderNotes(this.state.notes, 'Sustitute', 'All')}
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>C</label>
              <label>(combine)</label>
              {this.props.renderNotes(this.state.notes, 'Combine', 'All')}
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>A </label>
              <label>(adapt)</label>
              {this.props.renderNotes(this.state.notes, 'Adapt', 'All')}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>M </label>
              <label>(modify)</label>
              {this.props.renderNotes(this.state.notes, 'Modify', 'All')}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>P </label>
              <label>(put to other use)</label>
              {this.props.renderNotes(this.state.notes, 'Put to other use', 'All')}

            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>E </label>
              <label>(eliminate)</label>
              {this.props.renderNotes(this.state.notes, 'Eliminate', 'All')}

            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>R </label>
              <label>(rearrange)</label>
              {this.props.renderNotes(this.state.notes, 'Rearrange', 'All')}

            </div>
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


export default connect(mapStateToProps, null)(Scamper);
