import React, { useRef, useContext } from "react";
import SearchBarCard from "./SearchBarCard";
import useOutsideClickSearch from "../hooks/useOutsideClickSearch";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const SearchBarList = ({ articles, searchInputLength }) => {
  const extendedComponentRef = useRef(null);
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);

  useOutsideClickSearch(extendedComponentRef, () => setIsSearchOpen(false));
  if (articles) {
    console.log(articles);
  }
  return (
    <div
      ref={width > 640 ? extendedComponentRef : null}
      className="sm-mb-2 bg-white dark:bg-secondaryBg mt-6">
      {!searchInputLength && articles && (
        <h4 className="text-[0.85rem] text-primary dark:text-darkTextPrimary mt-1 sm:mt6 mb-1  sm:mb-0 sm:ml-2">
          Most Popular
        </h4>
      )}
      {articles &&
        articles?.map((article) => (
          <SearchBarCard key={article.title} article={article} />
        ))}
    </div>
  );
};

export default SearchBarList;
