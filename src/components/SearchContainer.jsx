import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "./Input";
import articlesArray from "../../data/articles";
import useOutsideClick from "../hooks/useOutsideClick";
import SearchBarList from "./SearchBarList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const SearchContainer = ({
  isSearchOpen,
  setIsSearchOpen,
  popularArticles,
}) => {
  const [articles, setArticles] = useState(articlesArray);
  const [searchInput, setSearchInput] = useState("");

  const { width, height } = useContext(ScreenSizeContext);
  const extendedComponentRef = useRef(null);

  useOutsideClick(extendedComponentRef, () => setIsSearchOpen(false));

  useEffect(() => {}, [searchInput]);

  const searchInputLength = searchInput.length;

  let filteredArticles = [];

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  articles &&
    articles.filter((article) => {
      if (article.body.toLowerCase().includes(searchInput.toLowerCase())) {
        filteredArticles.push(article);
      }
    });

  console.log(filteredArticles);

  return (
    <div className="relative w-full h-auto border-gray-200 border-b flex flex-col justify-center items-center p-2 ">
      <Input handleChange={handleSearchInput} searchInput={searchInput} />
      {isSearchOpen ? (
        searchInputLength > 0 && filteredArticles.length > 0 ? (
          <div className="w-[100%] max-h-[600px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4 top-[44px]">
            <SearchBarList
              articles={filteredArticles}
              searchInputLength={searchInputLength}
            />
          </div>
        ) : isSearchOpen && searchInputLength < 1 ? (
          <div
            ref={width > 640 ? extendedComponentRef : null}
            className="w-[100%] max-h-[600px] shadow-xl overflow-y-auto sm:ml-8  absolute rounded-xl p-4 pb-4 top-[44px] bg-white "
          >
            <SearchBarList articles={popularArticles && popularArticles} />
          </div>
        ) : (
          <div
            ref={width > 640 ? extendedComponentRef : null}
            className="w-[100%] h-[600px] shadow-xl overflow-y-auto sm:ml-8  absolute rounded-xl p-4 top-[44px] bg-white "
          >
            <p className="text-[0.85rem] text-primary sm:ml-2 sm:pt-4">
              No results found...
            </p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchContainer;
