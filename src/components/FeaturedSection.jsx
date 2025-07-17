import React, { useContext } from "react";
import FeaturedList from "./FeaturedList";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { ArticlesContext } from "../contexts/ArticlesContext";

const FeaturedSection = ({ handleSelectedArticle }) => {
  const {
    state: { loading },
  } = useContext(ArticlesContext);
  return (
    <section className="border-b border-l-none border-r-none sm:border-l sm:border-r  border-gray-200 dark:border-primary w-full h-[140px] sm:h-full sm:col-span-1 sm:row-span-1 sm:px-3 sm:py-3 ">
      <h3 className="w-full h-[14px] text-[12px] sm:text-[13px] sm:font-bold font-bold text-primary dark:text-darkTextPrimary mx-3 my-1 sm:ml-4 mt-2 sm:mt-0 ">
        Featured Articles
      </h3>
      <div className="w-full h-full sm:h-[96%]  sm:border sm:flex sm:item justify-center sm:border-gray-200 dark:border-primary  sm:p-2 sm:rounded-xl overflow-auto mt-1 sm:mt-2 scrollbar-hide">
        {loading ? (
          <div className="w-[100%] h-[600px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <FeaturedList handleSelectedArticle={handleSelectedArticle} />
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
