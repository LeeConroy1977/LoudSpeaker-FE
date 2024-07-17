import { createContext, useState } from "react";

export const SelectedTopicContext = createContext();

export const SelectedTopicProvider = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <SelectedTopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </SelectedTopicContext.Provider>
  );
};
