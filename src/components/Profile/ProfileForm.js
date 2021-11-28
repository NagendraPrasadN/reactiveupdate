import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
const ProfileForm = () => {
  const history = useHistory();

  const passRef = useRef();
  const loginCtxt = useContext(AuthContext);
  const changePassword = (event) => {
    event.preventDefault();
    const upPswd = passRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD6S3dUFIy9_NjMw_NwlBLW_Rk6HfzSKhE',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: loginCtxt.token,
          password: upPswd,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      history.replace('/');
    }
    )
  }
  return (
    <form className={classes.form} onSubmit={changePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={passRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
};

export default ProfileForm;