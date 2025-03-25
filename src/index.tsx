import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ReactQueryProvider } from "./react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);
