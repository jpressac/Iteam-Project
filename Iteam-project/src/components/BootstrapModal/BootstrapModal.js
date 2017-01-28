import React from 'react';
import { Modal, Button} from 'react-bootstrap';

export default class BootstrapModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  closeModal() {
      this.setState({
        show: false
      });
  }
  openModal() {
    this.setState({
    show : true
    });
  }
  render() {
    return (
      <Modal show={this.state.show} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.message}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onOk}> Ok</Button>
          <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>);
  }
  }
  BootstrapModal.propTypes ={
    message: React.PropTypes.string,
    onOk: React.PropTypes.func
}
