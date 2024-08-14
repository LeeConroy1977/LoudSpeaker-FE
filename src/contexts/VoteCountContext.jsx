import { createContext, useContext, useState } from "react";
import { MainArticleContext } from "./MainArticleContext";

export const VoteCountContext = createContext();

export const VoteCountProvider = ({ children }) => {
  const { article } = useContext(MainArticleContext);
  const [voteCount, setVoteCount] = useState(article.votes);

  return (
    <VoteCountContext.Provider value={{ voteCount, setVoteCount }}>
      {children}
    </VoteCountContext.Provider>
  );
};
