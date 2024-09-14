import React, { useContext, useEffect, useState } from "react";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SelectComponent from "../reuseable-components/SelectComponent";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { UserContext } from "../contexts/UserContext";
import categoriesArr from "../../data/categories";
import { postArticle } from "../../utilities/api/articlesApi";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { PopupContext } from "../contexts/PopupContext";
import useComposeToggle from "../hooks/UseComposeOpenToggle";

const ComposeForm = () => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticlesContext);
  const { toggleComposeOpen } = useComposeToggle();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [subTopicOptions, setSubTopicOptions] = useState([]);
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

  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const showPopup = useContext(PopupContext);

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
  }, [articleObject, selectedTopic, isSubmitted]);

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
    setIsSubmitted(true); // Set form submission flag
    handleValidateForm(); // Validate on submit

    if (
      isValidatedObj.title &&
      isValidatedObj.body &&
      isValidatedObj.articleURL &&
      isValidatedObj.topic
    ) {
      postArticle(articleObject)
        .then((article) => {
          console.log(article);
          setArticles([article, ...articles]);
        })
        .catch((error) => {
          console.error("Failed to create article:", error);
        });
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
      className="relative flex flex-col items-center justify-start
      w-full h-[480px] sm:w-full sm:h-[480px] border-gray-200 border-b sm:p-4 p-3 pt-0 mt-2 sm:mt-0"
    >
      <div className="flex items-center justify-between w-full h-[4.4rem]">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
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
          <div className="text-[0.65rem] font-semibold mt-1 ml-auto mr-10 sm:mt-1 text-red-500"></div>
        </div>
        <IoIosCloseCircleOutline
          onClick={toggleComposeOpen}
          className="w-[1.8rem] h-[1.8rem] mb-auto text-primary cursor-pointer"
        />
      </div>

      <form className="flex flex-col w-full h-[80%] sm:w-[80%] mt-2 pl-2 pr-2 sm:pl-0 sm:pr-0 sm:ml-2">
        <div className="flex w-[100%] justify-between items-center">
          <label className="text-[0.65rem] font-semibold mt-1 ml-2 sm:mt-4 text-primary">
            Title
          </label>
          {isValidatedObj.title === false && isSubmitted && (
            <div className="text-[0.65rem] font-semibold mt-4 mr-2  text-red-500">
              Add a title...
            </div>
          )}
          {isValidatedObj.title === true && (
            <div className="text-[0.65rem] font-semibold mt-4 mr-2  text-green-500">
              Awesome...
            </div>
          )}
        </div>
        <input
          name="title"
          type="text"
          placeholder="Add a title..."
          className="input h-[2.6rem] rounded-xl mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 p-4 text-[12px] text-primary font-500 placeholder:text-[12px]"
          value={articleObject.title}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          onBlur={() => handleBlur("title")}
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] font-semibold mt-4 ml-2 text-primary">
            Body
          </label>
          {isValidatedObj.body === false && isSubmitted && (
            <div className="text-[0.65rem] font-semibold ml-auto mr-2 mt-4 text-red-500">
              Add article body...
            </div>
          )}
          {isValidatedObj.body === true && (
            <div className="text-[0.65rem] font-semibold ml-auto mr-2 mt-4 text-green-500">
              Amazing...
            </div>
          )}
        </div>
        <textarea
          name="body"
          placeholder="Add article body..."
          className="input h-[8rem] rounded-xl mt-1 sm:mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 text-[12px] placeholder:text-[12px] text-primary font-500 resize-none p-4"
          value={articleObject.body}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] font-semibold ml-2 mt-4 text-primary">
            Image URL
          </label>
          {isValidatedObj.articleURL === false && isSubmitted && (
            <div className="text-[0.65rem] font-semibold mt-4 mr-2 text-red-500">
              Enter a valid URL...
            </div>
          )}
          {isValidatedObj.articleURL === true && (
            <div className="text-[0.65rem] font-semibold mt-4 mr-2 text-green-500">
              Ace...
            </div>
          )}
        </div>
        <input
          type="text"
          name="article_img_url"
          placeholder="Add an image address..."
          className="input h-[2.6rem] rounded-xl mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 p-4 text-[12px] text-primary font-500 placeholder:text-[12px]"
          value={articleObject.article_img_url}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </form>
      <div className="flex justify-end items-center sm:w-full sm:h-[240px] mt-4">
        <Button
          handleClick={handleSubmit}
          buttonStyle={`${width < 640 ? "buttonMobile" : "buttonMedium"}`}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default ComposeForm;
