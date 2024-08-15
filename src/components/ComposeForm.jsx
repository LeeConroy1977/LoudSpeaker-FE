import React, { useContext, useEffect, useState } from "react";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SelectComponent from "../reuseable-components/SelectComponent";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { UserContext } from "../contexts/UserContext";
import { CgProfile } from "react-icons/cg";
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
  const [postObject] = useState(null);
  const [errors, setErrors] = useState({});
  const showPopup = useContext(PopupContext);

  const [articleObject, setArticleObject] = useState({
    author: user.username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!selectedSubTopic) formErrors.topic = "Please select a sub-category";
    if (!articleObject.title.trim()) formErrors.title = "Title cannot be empty";
    if (!articleObject.body.trim()) formErrors.body = "Body cannot be empty";
    const imageUrlRegex = /^https:/;
    if (!imageUrlRegex.test(articleObject.article_img_url))
      formErrors.article_img_url =
        "Please enter a valid image URL (e.g., http://example.com/image.jpg)";
    return formErrors;
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);

    categoriesArr.map((category) => {
      if (category.category === event.target.value) {
        setSubTopicOptions(category.subcategories);
      }
    });
  };
  const handleSubTopicChange = (event) => {
    setSelectedSubTopic(event.target.value);
    setArticleObject({
      ...articleObject,
      topic: event.target.value.toLowerCase(),
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    postArticle(articleObject)
      .then((article) => {
        console.log(article);
        setArticles([article, ...articles]);
      })
      .catch((error) => {
        console.error("Failed to create article:", error);
        
      });
    setArticleObject({
      author: "",
      title: "",
      body: "",
      topic: "",
      article_img_url: "",
    });
    showPopup("Article posted successfully!");
    handleComposeOpen();
  }

  console.log(postObject);

  const mainCategories = categoriesArr.map((category) => category.category);

  return (
    <div
      className=" relative flex flex-col items-center justify-start
       w-full h-[420px] sm:w-full sm:h-[480px]  border-gray-200 border-b  sm:p-4 p-3 pt-0"
    >
      <div className="flex items-center justify-between w-full h-[4.4rem] ">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
          avatarURL={user.avatar_url}
        />

        <div className="flex items-center  w-full h-[22%] ml-2">
          {mainCategories && (
            <select
              className="selectMobile rounded-xl"
              value={selectedTopic}
              onChange={handleTopicChange}
            >
              <option value="" disabled>
                Topic
              </option>
              {mainCategories.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}
          <select
            className="selectMobile rounded-xl"
            value={selectedSubTopic}
            onChange={handleSubTopicChange}
          >
            <option value="" disabled>
              Sub-Topic
            </option>
            {subTopicOptions &&
              subTopicOptions.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
          </select>
          {errors.topic && (
            <div className="text-[0.65rem] font-semibold ml-10  text-red-500">
              {errors.topic}
            </div>
          )}
        </div>
        <IoIosCloseCircleOutline
          onClick={toggleComposeOpen}
          className="w-[1.8rem] h-[1.8rem] mb-auto text-primary cursor-pointer"
        />
      </div>
      <form className=" flex flex-col   w-full h-[80%] sm:w-[80%] mt-2 pl-2 pr-2 sm:pl-0 sm:pr:0  sm:ml-2 ">
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] font-semibold mt-1 ml-2 sm:mt-4  text-primary ">
            Title
          </label>

          {errors.title && (
            <div className="text-[0.65rem] font-semibold mt-1 mr-2 sm:mt-4 text-red-500 ">
              {errors.title}
            </div>
          )}
        </div>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 "
          value={articleObject.title}
          onChange={(e) =>
            setArticleObject({ ...articleObject, title: e.target.value })
          }
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] font-semibold mt-1 ml-2 sm:mt-4  text-primary ">
            Body
          </label>

          {errors.body && (
            <div className="text-[0.65rem] font-semibold mt-1 mr-2 sm:mt-4 text-red-500 ">
              {errors.body}
            </div>
          )}
        </div>
        <input
          type="text"
          className="input h-[8rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
          value={articleObject.body}
          onChange={(e) =>
            setArticleObject({ ...articleObject, body: e.target.value })
          }
        />
        <div className="flex w-[100%] justify-between">
          <label className="text-[0.65rem] font-semibold mt-1 ml-2 sm:mt-4  text-primary ">
            Image URL
          </label>

          {errors.article_img_url && (
            <div className="text-[0.65rem] font-semibold mt-1 mr-2 sm:mt-4 text-red-500 ">
              {errors.article_img_url}
            </div>
          )}
        </div>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
          value={articleObject.article_img_url}
          onChange={(e) =>
            setArticleObject({
              ...articleObject,
              article_img_url: e.target.value,
            })
          }
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
