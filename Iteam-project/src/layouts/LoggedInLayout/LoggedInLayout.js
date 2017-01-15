import React, {PropTypes} from 'react'
import HeaderLog from '../../components/Header/HeaderLog'


export const LoggedInLayout = ({ children }) => (
  <div className="text-center">
    <HeaderLog />
    <div>
      {children}
    </div>
  </div>
);

LoggedInLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default LoggedInLayout
