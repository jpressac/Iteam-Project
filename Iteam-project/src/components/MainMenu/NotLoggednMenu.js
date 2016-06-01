import React, {Component,PropTypes} from 'react'
import SlideMenu from './SlideMenu'
import { push } from 'react-router-redux'
import {PATHS} from '../constants/routes'

export class MainMenu extends React.Component {

  render(){
    let { items, push, location } = this.props

    if(typeof items === 'undefined') {
      items = []
    }

    items.push({
      icon: "fa fa-user",
      text: "Login",
      nav: PATHS.COMMON.LOGIN
    },
    {
      icon: "fa fa-user",
      text: "Register",
      nav: PATHS.COMMON.REGISTER
    },
    {
      icon: "fa fa-info-circle",
      text: "About",
      nav: PATHS.COMMON.ABOUT
    },
    {
        icon: "fa fa-pencil-square-o",
        text: "How to ?",
        nav: PATHS.COMMON.HOWTO
      }
    )

    return (
      <SlideMenu items={items} nav={push} location={location}/>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.router.locationBeforeTransitions.pathname,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    push: (dir) => dispatch(push(dir))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)
