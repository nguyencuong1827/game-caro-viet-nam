import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Navigation from "./navigation";
import Main from "./main";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Main />
      </Router>
    </div>
  );
}
export default App;
