
import React from 'react'
import equipo from '../assets/equipo.png'
import reunion from '../assets/reunion.png'
import reporte from '../assets/reporte.png'
import classes from './HomeView.scss'
import {Grid, Row, Col, Image} from 'react-bootstrap'
import RegistrationForm from '../../../components/RegistrationForm'
import ReactDOM from 'react-dom';


export class HomeView extends React.Component {
  render(){
    return(
      <div className={classes.homeDiv} >
  <Grid>
    <Row>
      <Col xs={5} md={3} >
        <Image src={equipo} rounded className={classes.image} />
         <label>CREA TU EQUIPO</label>
      </Col>
      <Col xs={5} md={3}>
        <Image src={reunion} rounded className={classes.image1}/>
        <label>CREA TU REUNION</label>
      </Col>
      <Col xs={5} md={3}>
        <Image src={reporte} rounded className={classes.image2}/>
        <label>OBTENE REPORTES DE TUS REUNIONES</label>
      </Col>
    </Row>
  </Grid>

</div>


)
}
}
export default HomeView
