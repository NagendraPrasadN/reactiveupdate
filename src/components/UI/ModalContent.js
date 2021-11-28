import Modal from '../UI/Modal';
import classes from './ModalContent.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const ModalContent = props => {
  const loginCtxt = useContext(AuthContext);

  const closeModal = () => {
    loginCtxt.showModal(false);
  }
  return (
    <Modal >
      <div className={classes.total}>
        <span>{loginCtxt.errorMessage}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={closeModal}>
          Close
          </button>
      </div>
    </Modal>
  )
}

export default ModalContent;