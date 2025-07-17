import { createContext, useContext, useState } from "react";
import { ArticlesContext } from "./ArticlesContext";

export const VoteCountContext = createContext();

export const VoteCountProvider = ({ children }) => {
  const {
    state: { selectedArticle },
  } = useContext(ArticlesContext);
  const [voteCount, setVoteCount] = useState(selectedArticle?.votes);

  return (
    <VoteCountContext.Provider value={{ voteCount, setVoteCount }}>
      {children}
    </VoteCountContext.Provider>
  );
};
