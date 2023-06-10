import './App.css';
import Header from './component/Home/Header';
import Home from './component/Home/Home.jsx';
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetails from './component/Products/ProductDetails';
import LoginSignup from "./component/Authentication/LoginSignup";



function App() {
  useEffect(() => {
  WebFont.load({
    google: {
      families:["Roboto","Droid Sans","Chilanka"]
    },
  });
},[]);

  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/login" component={LoginSignup} />
      </Switch>
    </Router>
  );
}

export default App;
