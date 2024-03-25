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
import { Main, Signup, Login } from "./components";
import Home from "./components/Home";
import About from "./components/About";
import Result from "./components/Result";
import History from "./components/History";
const user = localStorage.getItem("token");
const home = <Home />;
const about = <About />;
const result = <Result />;
const history = <History />;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {user && <Route path="/" exact element={<Main children={home} />} />}
      {user && (
        <Route path="/about" exact element={<Main children={about} />} />
      )}
      {user && (
        <Route path="/result" exact element={<Main children={result} />} />
      )}
      {user && (
        <Route path="/history" exact element={<Main children={history} />} />
      )}
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
