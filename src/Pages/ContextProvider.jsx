import { createContext, useState } from "react";

export const stateContext = createContext();

const ContextProvider = ({ children }) => {
  const [heart, setHeart] = useState(true);

  return (
    <stateContext.Provider value={{ heart, setHeart }}>
      {children}
    </stateContext.Provider>
  );
};

export default ContextProvider;
