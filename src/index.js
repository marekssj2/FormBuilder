import React from "react";
import ReactDOM from "react-dom";
import InputList from "./InputList";

import "./styles.css";

function App() {
  return <InputList />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
