import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import HeaderCart from '../../pages/HeaderCart';

const MainNavigation = (props) => {
  const loginCtxt = useContext(AuthContext);
  const isLoggedin = loginCtxt.isLoggedIn;

  const logoutHandler = () => {
    loginCtxt.logout();
  }

  const userName =  localStorage.getItem("userName") ? localStorage.getItem("userName").replace('@gmail.com', '') : '';

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Reactive Shop</div>
      </Link>
      {isLoggedin && <span className={classes.user}> Hey {userName} </span>}
      <nav>
        <ul>
          {!isLoggedin &&
            <li>
              <Link to='/login'>Login</Link>
            </li>
          }
          {isLoggedin && <HeaderCart onShowCart={props.onShowCart} />}

          {isLoggedin &&
            <li>
              <Link to='/shopping'>Shop</Link>
            </li>
          }
          {isLoggedin &&
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          }
          {isLoggedin &&
            <li>
              <button onClick={logoutHandler}>LogOut</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;