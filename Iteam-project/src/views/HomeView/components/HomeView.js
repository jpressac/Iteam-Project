
import React from 'react'
import meeting from '../assets/Creativeteam.png'
import report from '../assets/report2.png'
import team from '../assets/table.png'
import classes from './HomeView.scss'
import {Grid, Row, Col, Image, Carousel} from 'react-bootstrap'
import RegistrationForm from '../../../components/RegistrationForm'
import ReactDOM from 'react-dom';



export class HomeView extends React.Component {
  render(){
    return(
      <div className={classes.homeDiv} >

      <Carousel class ={classes.carouselDiv }>
   <Carousel.Item >
     <img  alt="team" src={team} className={classes.image }/>
     <Carousel.Caption className={classes.carouselText}>
             <h3 >CHOOSE YOUR TEAM</h3>
             <p>You can use filters to choose the participants</p>

           </Carousel.Caption>
     </Carousel.Item>

     <Carousel.Item>
       <img  alt="meeting" src={meeting} className={ classes.image }/>
       <Carousel.Caption className={classes.carouselText}>
               <h3 >START YOUR MEETING</h3>
               <p>Create your meeting and show your best ideas</p>

             </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img  alt="report" src={report} className={ classes.image }/>
         <Carousel.Caption className={classes.carouselText}>
                 <h3 >GET REPORTS AND RESULTS OF YOUR IDEAS</h3>
                 <p>you can select the best idea and get reports and feedback from participants </p>

               </Carousel.Caption>
         </Carousel.Item>
   </Carousel>



</div>


)
}
}
export default HomeView
