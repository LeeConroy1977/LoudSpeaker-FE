import { createContext, useState } from "react";
import users from "../../data/users";

export const ExistingUserContext = createContext();

export const ExistingUsersProvider = ({ children }) => {
  const [existingUsers, setExistingUsers] = useState([...users]);

  return (
    <ExistingUserContext.Provider value={{ existingUsers, setExistingUsers }}>
      {children}
    </ExistingUserContext.Provider>
  );
};
