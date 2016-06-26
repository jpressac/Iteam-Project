import React from 'react'

export class Modal extends React.Component {

  render(){
    return(
<div className="modal fade">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 className="modal-title">Warning</h4>
      </div>
      <div className="modal-body">
        <p>{this.props.message}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div)
  }
  Modal.propTypes ={
    message: PropTypes.string
  }
}
