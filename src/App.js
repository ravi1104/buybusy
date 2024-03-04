import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import SignIn from "./Pages/SigninPage";
import { Cart } from "./Pages/Cart";
import { store } from "./store";
import { NotFound } from "./Pages/NotFound";
import PrivateRoute from "./Pages/PrivateRoute";
import './styles.css'
import { Provider } from "react-redux";
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/signin",
          element: <SignIn />
        },
        {
          path: "/cart",
          element: (<PrivateRoute><Cart /></PrivateRoute>)
        }

      ]
    }
  ]);
  return (

    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>

  );
};

export default App;
