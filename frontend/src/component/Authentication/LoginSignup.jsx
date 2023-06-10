import { React, useEffect, useRef, useState } from "react";
import MetaData from "../../more/Metadata";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
//import { clearErrors, login, register } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./LoginSignup.css";

function LoginSignup() {

    const dispatch = useDispatch();



    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    //const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    // const loginSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(login(loginEmail, loginPassword));
    //   };

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };

  return (
    <>
    <MetaData title="Login or Signup" />
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")} >LOGIN</p>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className="loginForm" ref={loginTab}>
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
            //   value={loginEmail}
            //   onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
            //   value={loginPassword}
            //   onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link to="/password/forgot">Forgot Password ?</Link>
          <input type="submit" value="Login" className="loginBtn" />
          <Link to="/">
            <span>Login as a guest ?</span>
          </Link>
        </form>

        <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
         // onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
            //   value={name}
            //   onChange={registerDataChange}
            />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
            //   value={email}
            //   onChange={registerDataChange}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            //   value={password}
            //   onChange={registerDataChange}
            />
          </div>

          <div id="registerImage">
            <img   alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              //onChange={registerDataChange}
            />
          </div>
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </div>
    <div></div>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>

  )
}

export default LoginSignup
