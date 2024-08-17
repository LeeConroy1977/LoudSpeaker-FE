import { createContext, useState } from "react";

export const DeletedCommentIdContext = createContext();

export const DeletedCommentIdProvider = ({ children }) => {
  const [deletedCommentId, setDeletedCommentId] = useState(null);

  return (
    <DeletedCommentIdContext.Provider
      value={{ deletedCommentId, setDeletedCommentId }}
    >
      {children}
    </DeletedCommentIdContext.Provider>
  );
};
