import {Button} from 'react-toolbox/lib/button';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../../redux/reducers/Login/LoginUser'
import {classes} from './LogoutButton.scss'

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
      <div >
      <form method="POST" action="/application/member/logout">
        <Button type="submit"  >Logout</Button>
      </form>
        </div>
    );
  }
}
LogoutButton.propTypes = {
  onClick: PropTypes.func
};

export default connect(null, mapDispatchToProps)(LogoutButton)
