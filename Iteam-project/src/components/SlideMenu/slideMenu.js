
import React, { Component, PropTypes }  from 'react';
import classes from './slideMenu.scss'

export class SlideMenu extends React.Component {

  constructor(props){
    super(props);
    this.state = {visible: true };
  }

  show() {
        this.setState({ visible: true });
        document.addEventListener("click", this.hide.bind(this));
    }

  hide(){
        document.removeEventListener("click", this.hide.bind(this));
        this.setState({ visible: false });
    }

  render(){
    return (
      <div id="sidebar-wrapper" className={classes.sidebarWrapper} onClick={this.hide.bind(this)}>
        <ul class="sidebar-nav" className={classes.sidebarNav}>
          {this.props.children}
        </ul>
      </div>

    )
  };
}
function select(state){
  return {};
}
export default SlideMenu
