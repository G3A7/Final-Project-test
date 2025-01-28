/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export let tokenContext = createContext(null);
function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return <tokenContext.Provider value={{ token, setToken }}>{children}</tokenContext.Provider>;
}

export default TokenContextProvider;
