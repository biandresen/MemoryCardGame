import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// rfc = make Component
// stest = make test
// imd = import destructuring
// ush = create useState Hook
// ueh = create useEffect Hook
// uch = create useCallback Hook
// umh = create useMemo Hook
