import React from 'react'
import ReactDOM from 'react-dom';
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './meetingView.scss'
import  Calendar from '../../components/DateCalendar'
//import fondo from 'fondoCabezas.png'

class MeetingView extends React.Component {

  render(){
    return(
      <div className={"container"}>
          <div className={classes.label2}  style={{marginTop:20}}>
          <label>CREATE MEETING</label>
          </div>

            <div className={"well",classes.well} style={{width:550, height:450}} >
                <label> </label>

                <div className="row" >
            <form className="form-horizontal"  >
              <div className={"form-group", classes.filter}  >
                <div className="col-md-11">
                <div className="row">
                  <label for="name" className={"col-md-4 control-label"} style={{marginLeft:20, marginTop:10, fontSize: 17}}>Name <i className="glyphicon glyphicon-pencil "></i></label>
                  <div className="col-md-7">
                  <input type="text" className="form-control" id="inputname" ref="name" placeholder="Name"  style={{marginLeft:10, marginTop:10}}></input>
                  </div>
                </div>
              </div>
                <div className="col-md-11">
                  <div className="row">
                    <label for="description" className="col-md-4 control-label" style={{marginLeft:20, marginTop:30, fontSize: 17}}>Description <i className="glyphicon glyphicon-pencil "></i></label>
                    <div className="col-md-5">
                  <textarea class="form-control" placeholder="Write a description" rows="6" id="description" style={{marginTop:30,marginLeft:5, width:300}}></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-11">
                    <div className="row">
                      <label for="date" className="col-md-4 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Select date <i className="	glyphicon glyphicon-calendar"></i></label>
                      <div className={"col-md-7"} >
                        <input type="date" className="form-control" id="inputname" ref="name" placeholder="YYYY-MM-DD"  style={{marginLeft:10, marginTop:20}}></input>
                      </div>
                    </div>
                  </div>
                <div className="col-md-11">
                  <div className="row">
                    <label for="team" className="col-md-4 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>Select Team <i className="	glyphicon glyphicon-user"></i></label>
                    <div className="col-md-7">
                      <select className="form-control" id="team" data-width="fit" data-live-search="true" ref="filterName" defaultvalue="New Team" style={{marginLeft:10, marginTop:20}}>
                        <option> New Team </option>
                        <option> Existing team</option>
                      </select>
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
