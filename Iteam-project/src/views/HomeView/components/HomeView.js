
import React from 'react'
import team from '../assets/group.jpg'
import  meeting from '../assets/Creativeteam_opt.jpg'
import  report from '../assets/group4_opt.jpg'
import classes from './HomeView.scss'
import {Grid, Row, Col, Image, Carousel} from 'react-bootstrap'
import RegistrationForm from '../../../components/RegistrationForm'
import ReactDOM from 'react-dom';



export class HomeView extends React.Component {
  render(){
    return(
      <div className={"container",classes.homeDiv} >
      <div className={classes.text} style={{marginTop:20}}>
      <label className={classes.label}>START NOW</label>
      <p style={{fontSize:25, marginTop:-20}}> MAKE REMOTES TEAM MEETINGS IN REAL TIME </p>
      </div>

              <div id="home-carousel" className ={"carousel slide", classes.carouselDiv } data-ride="carousel">

                <div className={"carousel-inner"} style={{marginLeft:230}}>
                        <div className="item active">
                          <img  alt="team" src={team} className={classes.image}/>
                            <div className={"carousel-caption", classes.carouselText}>
                                  <h2>CHOOSE YOUR TEAM</h2>
                                  <p>You can use filters to choose the participants</p>

                          </div>
                        </div>
                        <div className="item">
                          <img  alt="team" src={meeting} className={classes.image }/>
                              <div className={"carousel-caption", classes.carouselText}>
                                  <h2>START YOUR MEETING</h2>
                                    <p>Create your meeting and show your best ideas</p>

                          </div>
                        </div>
                        <div className="item">
                          <img  alt="team" src={report} className={classes.image }/>
                          <div className={"carousel-caption", classes.carouselText}>

                                  <h2>GET REPORTS AND RESULTS OF YOUR IDEAS </h2>
                                    <p>you can select the best idea and get reports and feedback from participants</p>

                          </div>
                        </div>
                    </div>
                <nav id="nav-arrows" className="nav-arrows hidden-xs hidden-sm visible-md visible-lg">
                <a className="sl-prev hidden-xs" href="#home-carousel" data-slide="prev">
                    <i className="fa fa-angle-left fa-3x"></i>  </a>
                <a className="sl-next" href="#home-carousel" data-slide="next">
                <i className="fa fa-angle-right fa-3x"></i>  </a>
                </nav>
</div>

              </div>


)
}
}
export default HomeView
