import React, {Component} from "react";
import classes from './StarfishRetro.scss'
import ProgressBar from 'react-toolbox/lib/progress_bar';


const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId,
      connected: state.meetingUser,
      user: state.loginUser.user.username
    }
  }
};

class StarfishRetro extends Component {
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
              <label className={classes.letterRetro}>What should we START doing? </label>
              {this.props.renderNotes(this.state.notes, 'Start', 'All')}

            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letterRetro}>What should we STOP doing?</label>
              {this.props.renderNotes(this.state.notes, 'Stop', 'All')}

            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letterRetro}>What should we KEEP doing?</label>
              {this.props.renderNotes(this.state.notes, 'Keep', 'All')}

            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letterRetro}>What should we do MORE of? </label>
              {this.props.renderNotes(this.state.notes, 'More', 'All')}

            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letterRetro}> What should we do LESS of?</label>
              {this.props.renderNotes(this.state.notes, 'Less', 'All')}

            </div>
          </div>

        </div>
      </div>
    );
  }
}
StarfishRetro.propTypes = {

  user: PropTypes.string,
  notes: PropTypes.any,
  renderNotes: PropTypes.func

};

export default StarfishRetro;
