import { createContext, useState } from "react";

export const UserCommentContext = createContext();

export const UserCommentProvider = ({ children }) => {
  const [userComment, setUserComment] = useState({ body: "" });

  return (
    <UserCommentContext.Provider value={{ userComment, setUserComment }}>
      {children}
    </UserCommentContext.Provider>
  );
};
