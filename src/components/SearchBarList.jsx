import React from "react";
import SearchBarCard from "./SearchBarCard";

const SearchBarList = ({ articles, searchInputLength }) => {
  return (
    <div className="sm-mb-2">
      {!searchInputLength && (
        <h4 className="text-[0.85rem] text-primary mt-1 mb-1 sm:mt-0 sm:mb-0 sm:ml-2">
          Most Discussed
        </h4>
      )}

      {articles &&
        articles.map((article) => {
          return <SearchBarCard key={article.title} article={article} />;
        })}
    </div>
  );
};

export default SearchBarList;
