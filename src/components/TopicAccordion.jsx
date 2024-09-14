import React, { useContext, useState } from "react";
import categories from "../../data/categories";
import { MdPlayArrow } from "react-icons/md";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SelectedTopicContext } from "../contexts/SelectedTopicContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

const TopicAccordion = ({ handleTopicContainer }) => {
  const [topicIndex, setTopicIndex] = useState(null);
  const [subTopicIndex, setSubTopicIndex] = useState(null);
  const [topics] = useState(categories);

  const { selectedTopic, setSelectedTopic } = useContext(SelectedTopicContext);
  const { width } = useContext(ScreenSizeContext);
  const { hideModal } = useModal();

  function handleTopicToggle(index) {
    setTopicIndex((topicIndex) => (topicIndex === index ? null : index));
    setSubTopicIndex((subTopicIndex) => (subTopicIndex = null));
  }
  function handleSubTopicToggle(index) {
    setSubTopicIndex((subTopicIndex) =>
      subTopicIndex === index ? null : index
    );
  }

  function handleTopicSelection(topic) {
    setSelectedTopic(topic.toLowerCase());
  }

  return (
    <div className="w-full mb-2 mt-2 bg-white  rounded-xl pt-2 pb-2 sm:rounded-none sm:pt-0 ">
      {width < 640 && (
        <div className="w-full h-[50px]  border-b border-gray-200 flex items-center">
          <h4 className="h-[44px] text-[14px] font-semibold text-primary ml-2 fixed">
            Select a topic
          </h4>
          <div
            className="w-[30px] h-[30px]  flex justify-center items-center  bg-white rounded-full cursor-pointer absolute right-3 top-4"
            onClick={hideModal}
          >
            <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
          </div>
        </div>
      )}
      <div
        className={`${
          width < 640 ? "overflow-y-scroll" : null
        } w-[100%]  h-full`}
      >
        {topics.map((topic, index) => (
          <div key={index}>
            <div
              onClick={() => handleTopicToggle(index)}
              className={`${
                topicIndex === index ? "bg-gray-100 font-semibold" : "bg-white"
              } w-[100%] h-[2.5rem] flex 
           items-center pl-2 border-b border-gray-200 text-primary text-[0.9rem] last:border-b-0 cursor-pointer `}
            >
              {topic.category.length > 0 && (
                <span
                  className={`${
                    topicIndex === index ? "rotate-90" : null
                  } mr-3`}
                >
                  <MdPlayArrow />
                </span>
              )}

              {topic.category}
            </div>

            {topicIndex === index && (
              <div>
                {topic.subcategories.map((subcategory, subIndex) => {
                  return (
                    <>
                      <Link to={`/articles?topic=${subcategory.toLowerCase()}`}>
                        <div
                          key={subIndex}
                          onClick={() => {
                            handleSubTopicToggle(subIndex);
                            handleTopicSelection(subcategory);
                            hideModal();
                          }}
                          className={`${
                            subTopicIndex === subIndex
                              ? "bg-gray-100 font-semibold"
                              : "bg-white"
                          } w-[90%] h-[2.4rem] flex items-center ml-auto pl-3 border-b border-gray-200 text-[0.8rem] text-primary cursor-pointer`}
                        >
                          {subcategory}
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicAccordion;
