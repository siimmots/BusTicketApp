// SCSS entry. In production, the contents are extracted into a separate file. In dev, JS loads the CSS dynamically.
import "./scss/entry.scss";
// Polyfills
import "core-js/stable";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";

WebFont.load({
  google: {
    families: ["Lato:200,300,400,500,600,700", "sans-serif"],
  },
});

function render() {
  ReactDOM.render(
    // eslint-disable-next-line no-restricted-globals
    <BrowserRouter basename={`${location.pathname}#`}>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}
render();

/**
 * Hot module replacement
 * Uncomment the code to enable HMR in your app. Documentation:
 * https://webpack.js.org/api/hot-module-replacement/
 */
if (module.hot) {
  module.hot.accept("./App.js", () => {
    // ReactDOM.render(<App />, document.getElementById('root'));
    render();
  });
}
