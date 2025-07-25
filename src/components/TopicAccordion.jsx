import React, { useContext, useState } from "react";
import categories from "../../data/categories";
import { MdPlayArrow } from "react-icons/md";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { ArticleScrollContext } from "../contexts/ArticleScrollContext";
import { TopicsOpenContext } from "../contexts/TopicsOpenContext";

const TopicAccordion = () => {
  const [topicIndex, setTopicIndex] = useState(null);
  const [subTopicIndex, setSubTopicIndex] = useState(null);
  const [topics] = useState(categories);
  const { handleScrollToTop } = useContext(ArticleScrollContext);
  const { width } = useContext(ScreenSizeContext);
  const { hideModal } = useModal();
  const { setIsTopicsOpen } = useContext(TopicsOpenContext);

  function handleTopicToggle(index) {
    setTopicIndex((topicIndex) => (topicIndex === index ? null : index));
    setSubTopicIndex((subTopicIndex) => (subTopicIndex = null));
  }
  function handleSubTopicToggle(index) {
    setSubTopicIndex((subTopicIndex) =>
      subTopicIndex === index ? null : index
    );
  }

  function handleTopicSelection() {
    handleScrollToTop();
  }

  return (
    <div
      className={`${
        width < 900 ? "dark:bg-secondaryBg" : "dark:bg-darkBg"
      } w-full tablet:h-full mb-2 mt-2 bg-white dark:bg-darkBg rounded-xl pt-2 pb-2 tablet:rounded-none tablet:pt-0`}>
      {width < 900 && (
        <div
          className={`${
            width < 900 ? " dark:bg-secondaryBg" : "dark:bg-darkBg"
          } w-full h-[40px] sm-h-[50px]  border-b  border-gray-200 dark:border-primary flex items-center`}>
          <h4 className="h-[44px] text-[14px] font-semibold text-primary dark:text-darkTextPrimary ml-2 fixed">
            Select a topic
          </h4>
          <div
            className={`${
              width < 900 ? "dark:bg-secondaryBg" : "dark:bg-darkBg"
            } w-[30px] h-[30px]  flex justify-center items-center  bg-white rounded-full cursor-pointer absolute right-3 top-4`}
            onClick={() => {
              setIsTopicsOpen(false);
              hideModal();
            }}>
            <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
          </div>
        </div>
      )}
      <div
        className={`${
          width < 900
            ? "overflow-y-scroll scrollbar-hide dark:bg-secondaryBg"
            : null
        } w-[100%]  h-full bg-white dark:bg-darkBg`}>
        {topics.map((topic, index) => (
          <div key={index}>
            <div
              onClick={() => handleTopicToggle(index)}
              className={`${
                topicIndex === index && width < 900
                  ? "bg-gray-100 dark:bg-primary font-semibold"
                  : topicIndex === index && width > 900
                  ? "bg-gray-100 dark:bg-gray-900 font-semibold"
                  : width < 900
                  ? "bg-white dark:bg-secondaryBg"
                  : "bg-white dark:bg-darkBg"
              } w-[100%] h-[2.5rem] flex 
           items-center pl-2 border-b border-gray-200 dark:border-primary dark:text-darkTextPrimary text-primary text-[0.9rem] last:border-b-0 cursor-pointer  desktop:h-[48px] `}>
              {topic.category.length > 0 && (
                <span
                  className={`${
                    topicIndex === index ? "rotate-90" : null
                  } mr-3`}>
                  <MdPlayArrow className="dark:text-primary" />
                </span>
              )}

              {topic.category}
            </div>

            {topicIndex === index && (
              <div className="w-[100%]">
                {topic.subcategories.map((subcategory, subIndex) => {
                  return (
                    <>
                      <Link
                        to={`/articles?topic=${subcategory.toLowerCase()}`}
                        key={subIndex}>
                        <div
                          key={subIndex}
                          onClick={() => {
                            handleSubTopicToggle(subIndex);
                            handleTopicSelection(subcategory);
                            hideModal();
                          }}
                          className={`${
                            subTopicIndex === subIndex
                              ? "bg-gray-100 dark:bg-gray-900 font-semibold"
                              : width < 900
                              ? "bg-white dark:bg-secondaryBg"
                              : "bg-white dark:bg-darkBg"
                          } w-[90%] h-[2.4rem] desktop:h-[2.6rem] xl-screen:h-[2.8rem] flex items-center ml-auto pl-3 border-b border-gray-200 dark:border-primary text-[0.8rem] desktop:text-[0.9rem] text-primary dark:text-darkTextPrimary cursor-pointer`}>
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
