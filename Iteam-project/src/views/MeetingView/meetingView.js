import React, {Component, PropTypes} from "react";
import classes from './meetingView.scss'
import axios from 'axios'
import TimePicker from 'react-toolbox/lib/time_picker'
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker';
import Dialog from 'react-toolbox/lib/dialog';


let time = new Date();

const datetime = new Date();
const min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));
datetime.setFullYear(datetime.getFullYear());
datetime.setMonth(datetime.getMonth());

datetime.setHours(17);
datetime.setMinutes(28);

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM))
});

class MeetingView extends Component {
  state = {time};
  state2 = {date1: datetime};
  state3 = { active: false  };



  constructor(props) {
    super(props);
    this.state = {
      team: []

    }
  };

  handleToggle = () => {

      this.setState({active: !this.state3.active});


  };

  actions = [
    { label: "OK", onClick: this.handleToggle }

  ];


  dateChange = (item, value) => {
    this.setState({...this.state2, [item]: value});
  };

  handleChange = (time) => {
    console.log(time);
        this.setState({time: time});

  };


  componentDidMount() {
    axios.get('http://localhost:8080/team/byowner'
    ).then(function (response) {
      this.fillTeam(response.data)
    }.bind(this));
  }


  fillTeam(data) {
        let opt = [];
    if (data !== null) {
      data.map(function (obj) {
          opt.push(
          <option key={1} value={obj.name}>{obj.name}</option>
        );
      }.bind(this));
      this.setState({team: opt});
      this.forceUpdate();
    }
  }

  teamChanged(event) {
    let actualTeam = event.target.value;
    this.setState({team: actualTeam});
  }

  render() {

    const {onClick} =this.props;

    return (
      <div className={"container"}>
          <div className={classes.label2}>
            <label>CREATE MEETING</label>
          </div>

        <div className={" well-lg well-sm",classes.well}>
          <label> </label>

          <div className="row">
            <form className="form-horizontal">
              <div className={"form-group", classes.filter}>
                <div className="col-md-10">
                  <div className="row">
                    <label for="name" className={"col-md-4 col-sm-4 col-xs-6  control-label"}
                           style={{marginLeft:20, marginTop:10, fontSize: 17}}>Topic <i
                      className="glyphicon glyphicon-pencil "></i></label>
                    <div className="col-md-6 col-sm-6 col-xs-8 ">
                      <input type="text" className="form-control" id="inputname" ref="name"
                             style={{marginLeft:10, marginTop:10}}></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="description" className="col-md-4 col-sm-4 col-xs-6 control-label"
                           style={{marginLeft:20, marginTop:30, fontSize: 17}}>Description <i
                      className="glyphicon glyphicon-pencil "></i></label>
                    <div className="col-md-6 col-sm-6 col-xs-8 ">
                      <textarea class="form-control" placeholder="Write a description" rows="6" id="description"
                                style={{marginTop:30, width:500}}></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="date" className="col-md-4 col-sm-4 col-xs-6  control-label"
                           style={{marginLeft:20, marginTop:20, fontSize: 17}}>Time <i
                      className="	glyphicon glyphicon-calendar"></i></label>
                    <div className={"col-md-3 col-sm-3 col-xs-6 "}>
                      <TimePicker label='Select time' onChange={this.handleChange} value={this.state.time}/>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="date" className="col-md-4 col-sm-4 col-xs-6  control-label"
                           style={{marginLeft:20, marginTop:20, fontSize: 17}}>Date <i
                      className="	glyphicon glyphicon-calendar"></i></label>
                    <div className={"col-md-3 col-sm-3 col-xs-6 "}>
                      <DatePicker label='Select date' sundayFirstDayOfWeek
                      onChange={this.dateChange.bind(this, 'date1')}  minDate={min_datetime} value={this.state.date1} />

                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                <div className="row">
                  <label for="team" className="col-md-4 col-sm-4 col-xs-6 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Choose Team <i className="    glyphicon glyphicon-user"></i></label>
                  <div className="col-md-4 col-sm-6 col-xs-8">
                    <select  className="form-control" id="inputteam" ref="team" onChange={this.teamChanged.bind(this)} style={{marginLeft:10, marginTop:20}}>
                      <option value ="" default> Choose a team </option>
                      {this.state.team}
                    </select>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-4">
                    <button type="button" className={"btn btn-primary", classes.btnTeam}
                            style={{marginLeft:10, marginTop:20}} onClick={onClick}>
                      <span className="glyphicon glyphicon-ok"></span> Create Team
                    </button>
                  </div>
                </div>
              </div>
                <div className="col-md-11">
                    <div className="row">
                      <label for="team" className="col-md-4 control-label"
                             style={{marginLeft:20, marginTop:20, fontSize: 17}}> </label>
                      <div className="col-md-5">
                        <button type="button" className={"btn btn-primary", classes.btn}
                                style={{marginTop:40, marginLeft:10}}  onClick={this.handleToggle}>
                        <Dialog actions={this.actions} active={this.state.active} onEscKeyDown={this.handleToggle}
                          onOverlayClick={this.handleToggle} title='Please select a team or create new one'></Dialog>
                          <span className="glyphicon glyphicon-ok"></span> Create meeting
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </form>
          </div>



       </div>
       </div>


  );


  };
  }
MeetingView.propTypes = {
  onClick: PropTypes.func
};

export default connect(null, mapDispatchToProps)(MeetingView)

