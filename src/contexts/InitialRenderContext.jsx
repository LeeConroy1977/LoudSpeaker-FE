import { createContext, useState } from "react";

export const InitialRenderContext = createContext();

export const InitialRenderProvider = ({ children }) => {
  const [isInitialRender, setIsInitialRender] = useState(false);

  return (
    <InitialRenderContext.Provider
      value={{ isInitialRender, setIsInitialRender }}
    >
      {children}
    </InitialRenderContext.Provider>
  );
};
