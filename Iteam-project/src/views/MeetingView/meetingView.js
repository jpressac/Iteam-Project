import React from 'react'
import ReactDOM from 'react-dom';
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './meetingView.scss'
import  Calendar from '../../components/DateCalendar'

class MeetingView extends React.Component {

  render(){
    return(
      <div className={classes.formContent}>
      <div className={classes.label}>
      <label for="about"> CREATE THE MEETING </label>
</div>
<div className={classes.formContent2}>
<Form horizontal >
    <FormGroup controlId="formHorizontalName" >
      <Col componentClass={ControlLabel} sm={2}  >
        Name
      </Col>

      <Col sm={5}>
        <FormControl type="Name" placeholder="Name" />
      </Col>
    </FormGroup>


    <FormGroup controlId="formHorizontalName" >
      <Col componentClass={ControlLabel} sm={2}  >
        Description
      </Col>


      <FormGroup controlId="formControlsTextarea">
            <Col sm={5}>
            <FormControl componentClass="textarea" placeholder="Write a description about your meeting" />
            </Col>
          </FormGroup>
          </FormGroup>



   <FormGroup controlId="formControlsSelect">
   <Col componentClass={ControlLabel} sm={2}  >
   Select date
   </Col>
     <Col sm={5}>

    <Calendar></Calendar>
    </Col>
    </FormGroup>


    <FormGroup controlId="formHorizontalName" >
      <Col componentClass={ControlLabel} sm={2}  >
        Select Team
      </Col>

    <FormGroup controlId="formControlsSelect">
          <Col sm={4}>
      <FormControl componentClass="select" placeholder="select">
        <option value="New team">New team</option>
        <option value="Existing team">Existing team</option>
      </FormControl>
        </Col>
    </FormGroup>
    </FormGroup>

<FormGroup controlId="formControlsSelect">
<Col componentClass={ControlLabel} sm={2}  >

</Col>
<Col sm={5}>
   <Button type="submit">
     Create Meeting
   </Button>
     </Col>
     </FormGroup>
 </Form>
 </div>
          </div>

);
};
}

export default MeetingView
