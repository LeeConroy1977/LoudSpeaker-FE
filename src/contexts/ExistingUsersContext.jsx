import { createContext, useState } from "react";

export const ExistingUserContext = createContext();

export const ExistingUsersProvider = ({ children }) => {
  const [existingUsers, setExistingUsers] = useState([]);

  return (
    <ExistingUserContext.Provider value={{ existingUsers, setExistingUsers }}>
      {children}
    </ExistingUserContext.Provider>
  );
};
