import React, { useContext, useRef } from "react";
import Input from "./Input";
import useOutsideClickSearch from "../hooks/useOutsideClickSearch";
import SearchBarList from "./SearchBarList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchBarInputContext } from "../contexts/SearchBarInputContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ArticlesContext } from "../contexts/ArticlesContext";

const SearchContainer = () => {
  const { input, setInput } = useContext(SearchBarInputContext);
  const {
    state: { popularArticles, filteredArticles },
  } = useContext(ArticlesContext);
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const extendedComponentRef = useRef(null);

  useOutsideClickSearch(extendedComponentRef, () => {
    setIsSearchOpen(false);
  });

  const searchInputLength = input.length;

  function handleSearchInput(e) {
    setInput(e.target.value);
    if (!isSearchOpen) {
      setInput("");
    }
  }

  let filteredArticlesArr = [];
  filteredArticles &&
    filteredArticles.filter((article) => {
      if (
        article.body.toLowerCase().includes(input.toLowerCase()) ||
        article.title.toLowerCase().includes(input.toLowerCase())
      ) {
        filteredArticlesArr.push(article);
      }
    });

  return (
    <div
      ref={width > 640 ? extendedComponentRef : null}
      className="relative w-full h-auto border-gray-200 border-b flex flex-col justify-center items-center p-2 ">
      <Input handleChange={handleSearchInput} searchInput={input} />
      {isSearchOpen ? (
        searchInputLength > 0 && filteredArticlesArr.length > 0 ? (
          <div
            ref={width > 640 ? extendedComponentRef : null}
            className="w-[360px] h-[600px] shadow-xl overflow-y-auto scrollbar-hide sm:ml-8 bg-white dark:bg-gray-800 absolute rounded-xl p-4 top-[15px] z-40">
            <SearchBarList
              articles={filteredArticlesArr}
              searchInputLength={searchInputLength}
            />
          </div>
        ) : isSearchOpen && searchInputLength < 1 ? (
          <div
            ref={width > 640 ? extendedComponentRef : null}
            className="w-[360px] h-[600px] shadow-xl overflow-y-auto scrollbar-hide sm:ml-8  absolute rounded-xl p-4 pb-4 z-40  bg-white dark:bg-gray-800 top-[15px]">
            <SearchBarList articles={popularArticles && popularArticles} />
          </div>
        ) : (
          <div
            ref={width > 640 ? extendedComponentRef : null}
            className="w-[360px] h-[600px] shadow-xl overflow-y-auto scrollbar-hide sm:ml-8  absolute rounded-xl p-4 z-40 bg-white dark:bg-gray-800 top-[15px]">
            <p className="text-[0.85rem] text-primary dark:text-darkTextPrimary mt-6 ">
              No results found...
            </p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchContainer;
