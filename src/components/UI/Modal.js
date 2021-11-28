import { Fragment } from "react";
import classes from './Modal.module.css';
import React from 'react-dom';

const BackDrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};


const portalRoot = document.getElementById('overlays');
const Modal = (props) => {
  return (
    <Fragment>
      {React.createPortal(<BackDrop onClose={props.onClose} />, portalRoot)}
      {React.createPortal(<ModalOverlay> {props.children}</ModalOverlay>, portalRoot)}
    </Fragment>
  );
}

export default Modal;