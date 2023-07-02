import './App.css';
import Home from './component/Home/Home.jsx';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetails from './component/Products/ProductDetails';
import LoginSignup from "./component/Authentication/LoginSignup";
import UserData from './more/UserData';
import { useSelector } from 'react-redux';
import { loadUser, updatePassword } from './actions/userActions';
import store from './store';
import Profile from './component/user/Profile';
import ProtectedRoute from './route/ProtectedRoute';
import UpdatePassword from './component/user/UpdatePassword';
import EditProfile from './component/user/EditProfile';
import About from './component/about/About';
import Products from './component/Products/Products'
import Search from './component/Products/Search';
import Support from './more/Support'
import Cart from './component/cart/Cart';
import Favourite from './component/cart/Favourites';
import Shipping from './component/cart/Shipping';
import ConfirmOrder from './component/cart/ConfirmOrder';



function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  useEffect(() => {
  WebFont.load({
    google: {
      families:["Roboto","Droid Sans","Chilanka"]
    },
  });
  store.dispatch(loadUser())
},[]);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/about" component={About} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/favourites" component={Favourite} />
      <ProtectedRoute exact path="/shipping" component={Shipping}/>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
      <ProtectedRoute exact path="/me" component={Profile}/>
      <ProtectedRoute exact path="/me/update" component={UpdatePassword}/>
      <ProtectedRoute exact path="/me/update/info" component={EditProfile}/>

      </Switch>
    </Router>
  );
}

export default App;
