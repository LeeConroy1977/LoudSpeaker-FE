import { createContext, useState } from "react";

export const VisibleContext = createContext();

export const VisibleProvider = ({ children }) => {
  const [visible, setVisible] = useState(0);

  return (
    <VisibleContext.Provider value={{ visible, setVisible }}>
      {children}
    </VisibleContext.Provider>
  );
};
