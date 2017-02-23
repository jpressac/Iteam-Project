import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import classes from './ModalCSS.scss'
import logo from '../Header/image/iteamLogo.jpg'
import themeButton from '../Header/HeaderLog/button.scss'


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
          <Modal.Title id="contained-modal-title-lg" ><img className={classes.logo} src={logo} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.message}>
          <h4 className={classes.overflowAuto}>{this.props.message}</h4>
        </Modal.Body>
        <Modal.Footer>

          <Button onClick={this.closeModal.bind(this)} theme={themeButton}>OK</Button>
        </Modal.Footer>
      </Modal>);
  }
  }
  BootstrapModal.propTypes ={
    message: React.PropTypes.string
}
