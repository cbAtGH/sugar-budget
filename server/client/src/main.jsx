import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
