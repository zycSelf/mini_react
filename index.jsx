// import { createElement } from "react";
import { createElement } from "./src/mini_react";
import { createRoot } from "./src/mini_react_root";

const FunctionElement = () => {
  return (
    <div id="main">
      <p>456456</p>
      <span>198945</span>
    </div>
  );
};
const NormalElement = (
  <div id="main">
    <p>456456</p>
    <span>198945</span>
  </div>
);
const container = document.getElementById("root");
const root = createRoot(container);
console.log(root);
root.render(NormalElement);
