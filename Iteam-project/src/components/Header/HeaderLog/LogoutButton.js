/**
 * Created by Randanne on 18/08/2016.
 */

import Button from 'react-toolbox/lib/button';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../../redux/reducers/Login/LoginUser'

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(logout())
});
class LogoutButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {onClick} =this.props;
    return (
      <form method="POST" action="/application/member/logout">
        <button type="submit"/>
      </form>
    );
  }
}
LogoutButton.propTypes = {
  onClick: PropTypes.func
};

export default connect(null, mapDispatchToProps)(LogoutButton)
