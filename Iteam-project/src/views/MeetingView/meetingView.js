import React from 'react'
import ReactDOM from 'react-dom';
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './meetingView.scss'
import  Calendar from '../../components/DateCalendar'
import {getTeamData} from '../../redux/modules/TeamName'
import axios from 'axios'
import TimePicker from 'react-toolbox/lib/time_picker';


class MeetingView extends React.Component {


  constructor(props){
    super(props);
    this.state= {
      data: {}
      }

    }
    fillfields() {
      let data= this.state.data;
      this.refs.name.value= data.name;


    }
    componentDidMount(){
      getUserData().then( (response) => {
               axios.get('http://localhost:8080/team/byowner'
                             ).then(function(response){
                             this.setState({ data: response.data} );
                             this.fillfields();
                       }.bind(this)).catch(function(response){
                       console.log(response.error);
                     });
        })}

  render(){

    return(
      <div className={"container"}>
          <div className={classes.label2}  >
          <label>CREATE MEETING</label>
          </div>

            <div className={" well-lg well-sm",classes.well}  >
                <label> </label>

                <div className="row" >
            <form className="form-horizontal"  >
              <div className={"form-group", classes.filter}  >
                <div className="col-md-10">
                <div className="row">
                  <label for="name" className={"col-md-4 col-sm-4 col-xs-6  control-label"} style={{marginLeft:20, marginTop:10, fontSize: 17}}>Name <i className="glyphicon glyphicon-pencil "></i></label>
                  <div className="col-md-6 col-sm-6 col-xs-8 ">
                  <input type="text" className="form-control" id="inputname" ref="name" placeholder="Name"  style={{marginLeft:10, marginTop:10}}></input>
                  </div>
                </div>
              </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="description" className="col-md-4 col-sm-4 col-xs-6 control-label" style={{marginLeft:20, marginTop:30, fontSize: 17}}>Description <i className="glyphicon glyphicon-pencil "></i></label>
                    <div className="col-md-6 col-sm-6 col-xs-8 ">
                  <textarea class="form-control" placeholder="Write a description" rows="6" id="description" style={{marginTop:30, width:500}}></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                      <label for="date" className="col-md-4 col-sm-4 col-xs-6  control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Select date <i className="	glyphicon glyphicon-calendar"></i></label>
                      <div className={"col-md-3 col-sm-3 col-xs-6 "} >
                        </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                      <div className="row">
                        <label for="date" className="col-md-4 col-sm-4 col-xs-6  control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Select time <i className="	glyphicon glyphicon-calendar"></i></label>
                        <div className={"col-md-3 col-sm-3 col-xs-6 "} >
                          <input type="date" className="form-control" id="inputname" ref="name" placeholder="YYYY-MM-DD"  style={{marginLeft:10, marginTop:20}}></input>
                        </div>
                      </div>
                    </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="team" className="col-md-4 col-sm-4 col-xs-6 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Select Team <i className="	glyphicon glyphicon-user"></i></label>
                    <div className="col-md-4 col-sm-6 col-xs-8">
                      <select  value={this.state.selectValue} onChange={this.handleChange} className="form-control"
                      id="team" data-width="fit" data-live-search="true" ref="menu" style={{marginLeft:10, marginTop:20}}>
                        <option value="1"> New Team </option>
                        <option value="2"> Existing team</option>
                      </select>

                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label for="team" className="col-md-4 col-sm-4 col-xs-6 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Choose Team <i className="	glyphicon glyphicon-user"></i></label>
                    <div className="col-md-4 col-sm-6 col-xs-8">
                    <input type="text" className="form-control" id="inputteam" ref="team"   style={{marginLeft:10, marginTop:10}}></input>
                        </div>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <label for="team" className="col-md-4 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}> </label>
                    <div className="col-md-5">
                    <button type="button" className={"btn btn-primary", classes.btn} style={{marginTop:40, marginLeft:10}}>
                      <span className="glyphicon glyphicon-ok"></span> Create meeting
                    </button>
                    </div>
                 </div>
                </div>

            </div>
    </form>
    </div></div>

    </div>





  )
    };
    }

    export default MeetingView
