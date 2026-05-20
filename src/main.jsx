import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Portfolio from "./Portfolio"

//React speciially needs any modules written to be done so using a capitalisaiton
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>
)