import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "./Input";
import articlesArray from "../../data/articles";
import useOutsideClick from "../hooks/useOutsideClick";
import SearchBarList from "./SearchBarList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { FilteredArticlesContext } from "../contexts/FilteredArticlesContext";
import { SearchBarInputContext } from "../contexts/SearchBarInputContext";

const SearchContainer = ({
  isSearchOpen,
  setIsSearchOpen,
  popularArticles,
}) => {
  const { input, setInput } = useContext(SearchBarInputContext);

  const { width, height } = useContext(ScreenSizeContext);
  const { filteredArticles } = useContext(FilteredArticlesContext);
  const extendedComponentRef = useRef(null);

  useOutsideClick(extendedComponentRef, () => setIsSearchOpen(false));

  // useEffect(() => {}, [input]);

  const searchInputLength = input.length;

  function handleSearchInput(e) {
    setInput(e.target.value);
  }

  let filteredArticlesArr = [];
  filteredArticles &&
    filteredArticles.filter((article) => {
      if (article.body.toLowerCase().includes(input.toLowerCase())) {
        filteredArticlesArr.push(article);
      }
    });

  console.log(filteredArticlesArr);

  return (
    <div className="relative w-full h-auto border-gray-200 border-b flex flex-col justify-center items-center p-2 ">
      <Input handleChange={handleSearchInput} searchInput={input} />
      {isSearchOpen ? (
        searchInputLength > 0 && filteredArticlesArr.length > 0 ? (
          <div className="w-[100%] max-h-[600px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4 top-[44px]">
            <SearchBarList
              articles={filteredArticlesArr}
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
