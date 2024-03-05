import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Main, Signup, Login, Home, About, Result} from "./components";
const user = localStorage.getItem("token");
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {user && <Route path="/" exact element={<Main children={<Home/>}/>} />}
      {user && <Route path="/about" exact element={<Main children={<About/>}/>} />}
      {user && <Route path="/result" exact element={<Main children={<Result/>}/>} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
