import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import classes from './LoginForm.module.css';
import Swal from 'sweetalert2';

const LoginForm = (props) => {


  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const loginCtxt = useContext(AuthContext);

  const emailRef = useRef();
  const passRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevLogin) => !prevLogin);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    setLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6S3dUFIy9_NjMw_NwlBLW_Rk6HfzSKhE'

    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6S3dUFIy9_NjMw_NwlBLW_Rk6HfzSKhE'
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: emailValue,
          password: passValue,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      setLoading(false);
      if (response.ok) {
        return response.json();
      }
      else {
        return response.json().then(data => {
          let errorMessage = 'Authentication Failed';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage)

        });
      }
    }).then(data => {
      Swal.fire({
        title: 'Success!',
        text: "Logged In Succesfully!!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      localStorage.setItem("userName", emailValue);
      const expTime = +data.expiresIn;
      const expirationTime = new Date(new Date().getTime() + (expTime * 1000));
      loginCtxt.login(data.idToken, expirationTime);
      history.replace('/');
    }).catch(error => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

  }
  return (
    <section className={classes.login}>

      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'> Enter Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passRef} />
        </div>

        <div className={classes.actions}>
          {!isLoading ? <button>{isLogin ? 'Login' : 'Sign Up'}</button> : <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>

      </form>
    </section>
  );
};

export default LoginForm;