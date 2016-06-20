import React from 'react'
import Spinner from '../../components/SpinnerWrapper/'

function spinnerView () {
  return (
    <div id='spinnerPage'>
      <div>
        <Spinner overrideSpinnerClassName='colouredWhiteSpinner' />
      </div>
    </div>
  )
}

export default spinnerView
