
import React from 'react'
import Spinner from 'react-spinkit'

export class SpinnerWrapper extends React.Component {

  render () {
    const { overrideSpinnerClassName } = this.props
        return (<Spinner spinnerName='three-bounce' noFadeIn style={{margin:'0px'}} overrideSpinnerClassName={(!!overrideSpinnerClassName) ? overrideSpinnerClassName : 'colouredSpinner'} />)
  }
}

export default SpinnerWrapper
