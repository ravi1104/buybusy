import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from './navbar.module.css';
import { loginSelector } from "../../redux/reducers/loginReducer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  

const Navbar = () => {
  // const {loginData} = loginSelector();
  const {loginData} = useSelector(loginSelector);
  useEffect(()=>{
    if(loginData.fname){
      toast("welcome"+loginData.fname)
    }
  },[loginData])
  return (
    <>
      <nav className={styles.navbar}>
        <span className={styles.logo}>BuyBusy</span>
        <Link to="/"><span className={styles.home} >Home</span></Link>
        <div className={styles.right}>
          {loginData.fname ? (
            <>
              <h2>Welcome, {loginData.fname}!</h2>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
            </>
          )}
          <Link to="/cart"><img style={{ width: "38px" }} src="cart.png" alt="Cart Icon" /></Link>
          <span className={styles.cartIcon}></span>
        </div>
      </nav>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
      <Outlet />
    </>
  );
};

export default Navbar;
