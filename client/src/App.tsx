import React, { useEffect } from 'react';
import Header from './components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Product from './pages/Product';
import Footer from './components/Footer';
import Admin from './pages/admin/Admin';
import CreateProduct from './pages/admin/CreateProduct';
import EditProduct from './pages/admin/EditProduct';
import { useStateValue } from './context/State.Context';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { setLocalUser } from './utils/SetUser';
import Cart from './pages/Cart';
import Order from './pages/Order';
import PrivateRoute from './components/PrivateRoute';

// statics
import './App.css';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    let token = localStorage.shopifyToken;
    let authUser = setLocalUser(token);
    dispatch({
      type: 'SET_USER',
      user: authUser ? { ...authUser, token: token.replaceAll('"', '') } : null,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/s" component={Shops} />
        <Route exact path="/s/:pID" component={Product} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/orders" component={Order} />
        <PrivateRoute exact path="/cart" component={Cart} />
        {user?.isAdmin ? (
          <>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/create" component={CreateProduct} />
            <Route exact path="/admin/edit/:pID" component={EditProduct} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
      <Footer />
    </>
  );
};

export default App;
