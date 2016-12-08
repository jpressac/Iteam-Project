/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component, PropTypes} from 'react'
import jsPDF from 'jspdf'
import {connect} from 'react-redux';
import axios from 'axios';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import classes from './ReportTestForm.scss';
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import {MEETING} from '../../constants/HostConfiguration'
const report = new jsPDF()



class ReportTestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

};

export default ReportTestForm;
