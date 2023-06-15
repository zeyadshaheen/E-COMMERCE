import './App.css';
import Home from './component/Home/Home.jsx';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetails from './component/Products/ProductDetails';
import LoginSignup from "./component/Authentication/LoginSignup";
import UserData from './more/UserData';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import store from './store';
import Profile from './component/user/Profile';
import ProtectedRoute from './route/ProtectedRoute';



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
      <ProtectedRoute exact path="/me" component={Profile}/>
      </Switch>
    </Router>
  );
}

export default App;
