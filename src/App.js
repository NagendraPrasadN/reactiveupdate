import React from 'react';
import { Suspense, useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import AuthContext from './store/auth-context';

const HomePage = React.lazy(() => import('./pages/HomePage'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))
const ShoppingPage = React.lazy(() => import('./pages/ShoppingPage'))
const Cart = React.lazy(() => import('./components/CartContent/Cart'))


function App() {
  const authCtxt = useContext(AuthContext);
  const [showCart, setCarttoShow] = useState(false);

  const showCartHandler = () => {
    setCarttoShow(true);
  }

  const HideCartHandler = () => {
    setCarttoShow(false);
  }
  return (

    <Layout onShowCart={showCartHandler}>
      <Suspense fallback={<p>Loading...</p>}>
        {authCtxt.isLoggedIn && showCart && <Cart onClose={HideCartHandler} />}
        <Switch>
          <Route path="/" exact>
            {authCtxt.isLoggedIn && <HomePage />}
            {!authCtxt.isLoggedIn && <Redirect to='/login' />}
          </Route>
          {!authCtxt.isLoggedIn &&
            <Route path="/login" >
              <LoginPage />
            </Route>}

          <Route path="/shopping" >
            {authCtxt.isLoggedIn && <ShoppingPage />}
            {!authCtxt.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path="/profile" >
            {authCtxt.isLoggedIn && <ProfilePage />}
            {!authCtxt.isLoggedIn && <Redirect to='/login' />}
          </Route>

          <Route path="*" >
            <Redirect to='/' exact />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
