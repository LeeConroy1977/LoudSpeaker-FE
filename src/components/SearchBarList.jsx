import React, { useRef, useContext } from "react";
import SearchBarCard from "./SearchBarCard";
import useOutsideClick from "../hooks/useOutsideClick";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const SearchBarList = ({ articles, searchInputLength }) => {
  const extendedComponentRef = useRef(null);
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);

  useOutsideClick(extendedComponentRef, () => setIsSearchOpen(false));

  return (
    <div
      ref={width > 640 ? extendedComponentRef : null}
      className="sm-mb-2 bg-white z-50"
    >
      {!searchInputLength && (
        <h4 className="text-[0.85rem] text-primary mt-1 mb-1 sm:mt-0 sm:mb-0 sm:ml-2">
          Most Popular
        </h4>
      )}
      {articles &&
        articles.map((article) => (
          <SearchBarCard key={article.title} article={article} />
        ))}
    </div>
  );
};

export default SearchBarList;
