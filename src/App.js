import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./companents/Home";
import Form from "./companents/Form";
import Contact from "./companents/Contact";
import About from "./companents/About";
import "./App.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/Contact">
          <Contact />
        </Route>
      </Switch>
    </>
  );
};

export default App;
