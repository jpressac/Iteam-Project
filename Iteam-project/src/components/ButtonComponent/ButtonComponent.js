import React, {PropTypes} from 'react'
import {Button, IconButton} from "react-toolbox/lib/";
import buttonStyle from './theme.css'


class ButtonComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className={this.props.className}>
        <Button theme={buttonStyle} raised
                onClick={this.props.onClick} icon={this.props.iconButton}>
          {this.props.value}
        </Button>
      </div>
    )
  }
}

ButtonComponent.propTypes = {
  className: PropTypes.any,
  onClick: PropTypes.func,
  iconButton: PropTypes.string,
  value: PropTypes.string
};

export default ButtonComponent
