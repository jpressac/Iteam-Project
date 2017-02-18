import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import D3Tree from '../../../components/ReportsForm/D3tree/D3Tree'
import {getSharedReport} from '../../../utils/actions/reportActions'
import cssClasses from '../../../components/ComponentCSSForms/componentCSS.scss'
import cssViewClasses from '../../ViewContainerCSS/ViewContainer.scss'

const mapStateToProps = (state) => {
  return ({
    token: state.tokenReducer
  })
};

class TokenReportView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      treeData: undefined
    }
  }

  componentWillMount() {
    console.log(this.props.token)
    getSharedReport(this.props.token)
      .then((response) => {
        console.log(response.data)
        this.setState({treeData: response.data})
      })
  }

  render() {
    return (
      <div className={"container " + cssClasses.containerForm + " " + cssViewClasses.formContainer}>
        <D3Tree treeData={this.state.treeData}/>
      </div>
    )
  }
}

TokenReportView.propTypes = {
  token: PropTypes.string
}

export default connect(mapStateToProps, null)(TokenReportView)
