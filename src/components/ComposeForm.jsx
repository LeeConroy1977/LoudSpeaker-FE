import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SelectComponent from "../reuseable-components/SelectComponent";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { UserContext } from "../contexts/UserContext";
import categoriesArr from "../../data/categories";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { PopupContext } from "../contexts/PopupContext";
import useComposeToggle from "../hooks/UseComposeOpenToggle";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";
import useOutsideClickCompose from "../hooks/UseOutsideClickCompose";
import { PostCommentOpenContext } from "../contexts/PostCommentOpenContext";

const ComposeForm = ({ isDisabled, setIsDisabled }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  const { createArticle } = useContext(ArticlesContext);
  const { setIsComposeOpen } = useContext(ComposeOpenContext);
  const { toggleComposeOpen } = useComposeToggle();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [subTopicOptions, setSubTopicOptions] = useState([]);
  const { setIsPostCommentOpen } = useContext(PostCommentOpenContext);
  const [isValidatedObj, setIsValidatedObj] = useState({
    topic: null,
    title: null,
    body: null,
    articleURL: null,
  });
  const [articleObject, setArticleObject] = useState({
    author: user.username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const showPopup = useContext(PopupContext);
  const extendedComponentRef = useRef(null);

  useOutsideClickCompose(extendedComponentRef, () => {
    setIsComposeOpen(false);
  });

  function handleValidateForm() {
    const { title, body, article_img_url } = articleObject;
    const imageUrlRegex = /^https:/;

    setIsValidatedObj({
      title:
        isSubmitted && title.length === 0
          ? false
          : isSubmitted && title.length === 0
          ? true
          : title.length > 0
          ? true
          : null,
      body:
        isSubmitted && body.length === 0
          ? false
          : isSubmitted && body.length === 0
          ? true
          : body.length > 0
          ? true
          : null,
      articleURL:
        isSubmitted && article_img_url.length === 0
          ? false
          : article_img_url.length > 0 && imageUrlRegex.test(article_img_url),
      topic: selectedTopic.length > 0,
    });
    if (
      isValidatedObj.title &&
      isValidatedObj.body &&
      isValidatedObj.articleURL &&
      isValidatedObj.topic
    ) {
      setIsDisabled(false);
    }
  }

  function handleChange(name, value) {
    setArticleObject((obj) => ({ ...obj, [name]: value }));

    handleValidateForm();
  }

  function handleBlur(name) {
    if (!isSubmitted && articleObject[name].length === 0) {
      setIsValidatedObj((obj) => ({ ...obj, [name]: false }));
    }
  }

  useEffect(() => {
    handleValidateForm();
  }, [articleObject, setArticleObject, selectedSubTopic, isSubmitted]);

  function handleTopicChange(event) {
    const selectedCategory = event.target.value;
    setSelectedTopic(selectedCategory);

    const category = categoriesArr.find(
      (cat) => cat.category === selectedCategory
    );
    if (category) {
      setSubTopicOptions(
        category.subcategories.map((sub) => ({ sort: sub, title: sub }))
      );
    }
  }

  const handleSubTopicChange = (event) => {
    setSelectedSubTopic(event.target.value);
    setArticleObject((prev) => ({
      ...prev,
      topic: event.target.value.toLowerCase(),
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    handleValidateForm();

    if (
      isValidatedObj.title &&
      isValidatedObj.body &&
      isValidatedObj.articleURL &&
      isValidatedObj.topic
    ) {
      createArticle(articleObject);
      setArticleObject({
        author: user.username,
        title: "",
        body: "",
        topic: "",
        article_img_url: "",
      });
      showPopup("Article posted successfully!");
      toggleComposeOpen();
    }
  }

  const mainCategories = categoriesArr.map((category) => ({
    sort: category.category,
    title: category.category,
  }));

  return (
    <div
      ref={extendedComponentRef}
      className="relative flex flex-col items-center justify-start
      w-full h-[480px] tablet:w-full tablet:h-[480px] border-gray-200 dark:border-primary border-b tablet:p-4 p-3 tablet-portrait:px-6 pt-0 mt-2 tablet:mt-0">
      <div className="flex items-center justify-between w-full h-[4.4rem]">
        <Avatar
          avatarStyle={
            width < 800
              ? "avatarMobile"
              : width < 1920
              ? "avatarComposeTablet"
              : "avatarComposeMain"
          }
          avatarURL={user.avatar_url}
        />
        <div className="w-full flex items-center justify-start ml-4">
          <SelectComponent
            defaultOption="Topic"
            optionArray={mainCategories}
            handleChange={handleTopicChange}
            selectedOption={selectedTopic}
          />
          <SelectComponent
            defaultOption="Sub-Topic"
            optionArray={subTopicOptions}
            handleChange={handleSubTopicChange}
            selectedOption={selectedSubTopic}
          />
        </div>
        <IoIosCloseCircleOutline
          onClick={() => {
            setIsPostCommentOpen(false);
            toggleComposeOpen();
          }}
          className="w-[1.8rem] h-[1.8rem] mb-auto text-primary cursor-pointer"
        />
      </div>

      <form className="flex flex-col w-full h-[80%] tablet:w-[80%] mt-2 pl-2 pr-2 tablet:pl-0 tablet:pr-0 tablet:ml-2">
        <div className="flex w-[100%] justify-between items-center">
          <label className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-1 ml-2 tablet:mt-4 text-primary dark:text-darkTextPrimary">
            Title
          </label>
          {isValidatedObj.title === false && isSubmitted && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-4 mr-2  text-red-500">
              Add a title...
            </div>
          )}
          {isValidatedObj.title === true && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-4 mr-2  text-green-500">
              Awesome...
            </div>
          )}
        </div>
        <input
          name="title"
          type="text"
          placeholder="Add a title..."
          className="input h-[2.6rem] rounded-xl mt-1 border dark:bg-gray-800 border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary  dark:focus:border-primary focus:border-2 p-4 text-[12px] text-primary dark:text-darkTextPrimary  font-500 placeholder:text-[12px]"
          value={articleObject.title}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          onBlur={() => handleBlur("title")}
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-4 ml-2 text-primary dark:text-darkTextPrimary">
            Body
          </label>
          {isValidatedObj.body === false && isSubmitted && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold ml-auto mr-2 mt-4 text-red-500">
              Add article body...
            </div>
          )}
          {isValidatedObj.body === true && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold ml-auto mr-2 mt-4 text-green-500">
              Amazing...
            </div>
          )}
        </div>
        <textarea
          name="body"
          placeholder="Add article body..."
          className="input h-[8rem] rounded-xl mt-1 tablet:mt-1 border border-gray-200   dark:bg-gray-800 dark:border-gray-800  focus:outline-none focus:border-primary dark:focus:border-primary  focus:border-2 text-[12px] placeholder:text-[12px] text-primary dark:text-darkTextPrimary  font-500 resize-none p-4"
          value={articleObject.body}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold ml-2 mt-4 text-primary dark:text-darkTextPrimary">
            Image URL
          </label>
          {isValidatedObj.articleURL === false && isSubmitted && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-4 mr-2 text-red-500">
              Enter a valid URL...
            </div>
          )}
          {isValidatedObj.articleURL === true && (
            <div className="text-[0.65rem] xl-screen:text-[0.7rem] font-semibold mt-4 mr-2 text-green-500">
              Ace...
            </div>
          )}
        </div>
        <input
          type="text"
          name="article_img_url"
          placeholder="Add an image address..."
          className="input h-[2.6rem] rounded-xl mt-1 border border-gray-200 dark:bg-gray-800 dark:border-gray-800  focus:outline-none focus:border-primary dark:focus:border-primary  focus:border-2 p-4 text-[12px] text-primary dark:text-darkTextPrimary  font-500 placeholder:text-[12px]"
          value={articleObject.article_img_url}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </form>
      <div className="flex justify-end items-center tablet:w-full tablet:h-[240px] mt-4">
        <Button
          handleClick={handleSubmit}
          handleDisabled={isDisabled}
          buttonStyle={
            isDisabled
              ? "buttonFormDisabled bg-gray-200 dark:bg-secondaryBg dark:text-gray-400"
              : "buttonMedium  dark:bg-primary dark:text-darkTextPrimary"
          }>
          Post
        </Button>
      </div>
    </div>
  );
};

export default ComposeForm;
