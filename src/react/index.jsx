import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const Hello = () => <h1>hello hello hello </h1>;

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Hello />
  </StrictMode>
);
