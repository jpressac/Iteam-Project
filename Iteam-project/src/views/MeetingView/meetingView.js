import React, {Component, PropTypes} from "react";
import classes from './meetingView.scss'
import axios from 'axios'
import TimePicker from 'react-toolbox/lib/time_picker'
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker';
import Dialog from 'react-toolbox/lib/dialog';


var time = new Date();
var programDate = new Date();
var datetime = new Date();
const min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));
datetime.setFullYear(datetime.getFullYear());
datetime.setMonth(datetime.getMonth());

datetime.setHours(time.getHours());
datetime.setMinutes(time.getMinutes());

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM))
});

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};
class MeetingView extends Component {
  state1 = {time};
  state2 = {datetime: datetime};
  //state3 = { active: false  };



  constructor(props) {
    super(props);
    this.state = {
      team: []

    }
  };

  // handleToggle = () => {
  //
  //     this.setState({active: !this.state3.active});
  // };
  //
  // actions = [
  //   { label: "OK", onClick: this.handleToggle.bind(this) }
  // ];

  handleChange = (time) => {

    this.setState({time: time});
    programDate.setHours(time.getHours());
    programDate.setMinutes(time.getMinutes());
    console.log('time ' + datetime);

  };

  dateChange = (datetime) => {
    this.setState({ datetime: datetime });
   programDate.setFullYear(datetime.getFullYear());
    programDate.setMonth(datetime.getMonth());
    programDate.setDate(datetime.getDate());


    programDate.setHours(this.state.time.getHours());
    programDate.setMinutes(this.state.time.getMinutes());

    console.log('dateTime ' + programDate  );


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
      data.map(function (obj,index) {
          opt.push(
          <option key={index} value={obj.name}>{obj.name}</option>
        );
      }.bind(this));
      this.setState({team: opt});
      this.forceUpdate();
    }
  }
  teamChanged(event){
    let actualTeam = event.target.value;
    this.setState({value: actualTeam});

  }

  dateTimeProgrammed(datetime)
    {

      function pad(n) { return n < 10 ? '0' + n : n }
    let IsoString = datetime.getFullYear() + '-'
      + pad(datetime.getMonth() + 1) + '-'
      + pad(datetime.getDate()) + 'T'
      + pad(datetime.getHours()-3) + ':'
      + pad(datetime.getMinutes()) + ':'
      + pad(datetime.getSeconds());
    if(datetime.getTimezoneOffset() == 0) IsoString += 'Z';
      programDate = IsoString;
    return IsoString;
  };

  createMeeting()
  {
    console.log(programDate);
  //this.dateTimeProgrammed(programDate);
    let e = document.getElementById("inputTeam");
    let teamName = e.options[e.selectedIndex].text;
    axios.post('http://localhost:8080/meeting/create', {
      topic: this.refs.name.value,
      ownerName:this.props.user ,
      programmedDate:programDate,
      teamName:teamName,
      description: this.refs.description.value

    }).then(function (response) {
      console.log(response.status);
               }.bind(this)).catch(function (response) {
      console.log(response.status);

  });
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
                      <textarea class="form-control" ref="description" placeholder="Write a description" rows="6" id="description"
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
                      onChange={this.dateChange}  minDate={min_datetime} value={this.state.datetime} />

                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                <div className="row">
                  <label for="team" className="col-md-4 col-sm-4 col-xs-6 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Choose Team <i className="    glyphicon glyphicon-user"></i></label>
                  <div className="col-md-4 col-sm-6 col-xs-8">
                    <select  className="form-control" id="inputTeam" ref="team" onChange={this.teamChanged.bind(this)} style={{marginLeft:10, marginTop:20}}>
                      <option value={this.state.value} > </option>
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
                                style={{marginTop:40, marginLeft:10}} onClick={this.createMeeting.bind(this)}>
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
  onClick: PropTypes.func,
  user: PropTypes.any
};

export default connect(mapStateToProps,mapDispatchToProps)(MeetingView)




