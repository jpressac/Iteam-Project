import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import cssClasses from '../../components/ComponentCSSForms/componentCSS.scss'
import classes from './sharedReportView.scss'
import InputComponent from '../../components/InputComponent/InputComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import {saveTokenSharedReport} from '../../redux/reducers/Report/TokenReducer'
import {PATHS} from '../../constants/routes'
import Avatar from 'react-toolbox/lib/avatar'
import avatarTheme from './avatarTheme.scss'


const mapStateToProps = (state) => {
  return ({})
};

const mapDispatchToProps = dispatch => ({

  tokenReport: () => {
    dispatch(push('/' + PATHS.SHARED_REPORT.SHARED))
  },
  saveTokenReport: (token) => {
    dispatch(saveTokenSharedReport(token))
  }
});

class SharedReportView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      urlToken: ''
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  saveToken() {

    let token = this.state.urlToken.split('=')[1]
    console.log(token)
    this.props.saveTokenReport(token)

    this.props.tokenReport()
  }

  render() {
    return (

      <div className={"container " + classes.containerForm}>
        <div className={cssClasses.labelMainTitle}>
          <label>SHARED REPORT</label>
          <Avatar theme={avatarTheme} icon="supervisor_account"/>
        </div>
        <div className={cssClasses.form}>
          <label>Copy link here to share report</label>
          <InputComponent className="col-md-12" label="Token URL"
                          onValueChange={this.handleChange.bind(this, 'urlToken')}
                          value={this.state.urlToken}/>
          <ButtonComponent className="col-md-12" raisedValue value="GO" onClick={this.saveToken.bind(this)}/>
        </div>
      </div>

    )
  }
}

SharedReportView.propTypes = {
  tokenReport: PropTypes.func,
  saveTokenReport: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(SharedReportView)
