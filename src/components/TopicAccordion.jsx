import React, { useContext, useState } from "react";
import categories from "../../data/categories";
import { MdPlayArrow } from "react-icons/md";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const TopicAccordion = ({ handleTopicContainer }) => {
  const [topicIndex, setTopicIndex] = useState(null);
  const [subTopicIndex, setSubTopicIndex] = useState(null);
  const [topics, setTopics] = useState(categories);

  const { width, height } = useContext(ScreenSizeContext);

  function handleTopicToggle(index) {
    setTopicIndex((topicIndex) => (topicIndex === index ? null : index));
    setSubTopicIndex((subTopicIndex) => (subTopicIndex = null));
  }
  function handleSubTopicToggle(index) {
    setSubTopicIndex((subTopicIndex) =>
      subTopicIndex === index ? null : index
    );
  }
  return (
    <div className="w-full mb-2 mt-2 bg-white  rounded-xl pt-2 pb-2 sm:rounded-none sm:pt-0">
      {width < 640 && (
        <h4 className="border-b border-gray-200 h-[44px] font-semibold text-primary">
          Select a topic
        </h4>
      )}

      {topics.map((topic, index) => (
        <div key={index}>
          <div
            onClick={() => handleTopicToggle(index)}
            className={`${
              topicIndex === index ? "bg-gray-100 font-semibold" : "bg-white"
            } w-full h-[2.5rem] flex 
           items-center pl-2 border-b border-gray-200 text-primary text-[0.9rem] last:border-b-0 cursor-pointer`}
          >
            {topic.subcategories.length > 0 && (
              <span
                className={`${topicIndex === index ? "rotate-90" : null} mr-3`}
              >
                <MdPlayArrow />
              </span>
            )}

            {topic.category}
          </div>
          <div>
            {topicIndex === index && (
              <div>
                {topic.subcategories.map((subcategory, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => {
                      handleSubTopicToggle(subIndex);
                      handleTopicContainer();
                    }}
                    className={`${
                      subTopicIndex === subIndex ? "bg-gray-100" : "bg-white"
                    } w-[90%] h-[2.4rem] flex items-center ml-auto pl-3 border-b border-gray-200 text-[0.8rem] text-primary cursor-pointer`}
                  >
                    {subcategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicAccordion;
