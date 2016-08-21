/**
 * Created by Randanne on 18/08/2016.
 */

import Button from 'react-toolbox/lib/button';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from '../../../redux/reducers/Login/LoginUser'

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(logoutUser())
});
class LogoutButton extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const {onClick} =this.props
    return (
      <Button
        label="LOGOUT"
        onClick={onClick}
        accent
      />
    );
  }
}
LogoutButton.propTypes = {
  onClick: PropTypes.func
};

export default connect(mapDispatchToProps)(LogoutButton)
