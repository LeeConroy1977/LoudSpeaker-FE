import React from "react";
import FeaturedList from "./FeaturedList";

const FeaturedSection = () => {
  return (
    <section className="border-b border-l border-r border-gray-200 w-full h-[120px] sm:h-full sm:col-span-1 sm:row-span-1 sm:px-3 sm:py-3  ">
      <h3 className="w-full h-[14px] text-[12px] sm:text-[14px] sm:font-bold font-bold text-primary mx-2 my-1 sm:ml-4 sm:mt-0">
        Featured Articles
      </h3>
      <div className="w-full h-full sm:h-auto  sm:border sm:flex sm:border-gray-200 sm:p-2 sm:rounded-xl overflow-auto sm:mt-2">
        <FeaturedList />
      </div>
    </section>
  );
};

export default FeaturedSection;
