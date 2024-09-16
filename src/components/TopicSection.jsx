import React from "react";
import TopicAccordion from "./TopicAccordion";

const TopicSection = () => {
  return (
    <section className="border-b border-l border-r border-gray-200 dark:border-primary w-full h-[134px] sm:h-full sm:col-span-1 sm:row-span-1 sm:px-3 sm:py-3  ">
      <h3 className="w-full h-[14px] text-[12px] sm:text-[13px] sm:font-bold font-bold text-primary mx-2 my-1 sm:ml-4 sm:mt-0 dark:text-darkTextPrimary">
        Topics
      </h3>
      <div className="w-full h-full sm:h-[96%] sm:border sm:flex sm:border-gray-200 dark:border-primary sm:p-2 sm:rounded-xl overflow-y-scroll scrollbar-hide sm:mt-2">
        <TopicAccordion />
      </div>
    </section>
  );
};

export default TopicSection;
