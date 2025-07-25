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
      ref={width > 900 ? extendedComponentRef : null}
      className="sm-mb-2 bg-white dark:bg-secondaryBg mt-6 tablet-portrait:mt-10  desktop:mt-8">
      {!searchInputLength && articles && (
        <h4 className="text-[0.85rem] tablet:text-[0.75rem] desktop:text-[0.8rem] xl-screen:text-[0.85rem] text-primary dark:text-darkTextPrimary mt-1  tablet:mt-6 desktop:mt-8 mb-1 ml-1  tablet:mb-0 font-semibold">
          Popular articles
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
