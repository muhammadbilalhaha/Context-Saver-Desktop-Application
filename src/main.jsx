import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { invoke } from "@tauri-apps/api/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Tell backend frontend is ready
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function setup() {
  console.log('Setting up frontend...');
  await sleep(1); // Simulate setup
  console.log('Frontend ready!');
  invoke('set_complete', { task: 'frontend' });
}

setup();