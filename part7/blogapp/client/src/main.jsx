import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import Notification from "./components/Notification";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="mx-20 mt-4">
    <Provider store={store}>
      <Notification />
      <App />
    </Provider>
  </div>,
);
