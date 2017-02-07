import React, {PropTypes, Component} from 'react'
import classes from './footer.scss'

class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={"container " + classes.footer}>
        <div className="col-md-4">
          <ul>
            <li>
              Puto 1
            </li>
            <li>
              Puto 2
            </li>
            <li>
              Puto 3
            </li>
            <li>
              Puto 4
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <ul>
            <li>
              Puto 5
            </li>
            <li>
              Puto 6
            </li>
            <li>
              Puto 7
            </li>
            <li>
              Puto 8
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <ul>
            <li>
              Puto 9
            </li>
            <li>
              Puto 10
            </li>
            <li>
              Puto 11
            </li>
            <li>
              Puto 12
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
