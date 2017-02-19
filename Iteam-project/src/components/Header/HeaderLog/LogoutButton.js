import React, {PropTypes} from 'react';
import {Button} from 'react-toolbox/lib/button';
import {connect} from 'react-redux';
import {logout} from '../../../redux/reducers/Login/LoginUser'
import {classes} from './LogoutButton.scss'
import themeIcons from './icons.scss'

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(logout())
});
class LogoutButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form method="POST" action="/application/member/logout">
        <Button type="submit" icon="exit_to_app" theme={themeIcons}></Button>
      </form>
    );
  }
}
LogoutButton.propTypes = {
  onClick: PropTypes.func
};

export default connect(null, mapDispatchToProps)(LogoutButton)
