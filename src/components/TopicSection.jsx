import TopicAccordion from "./TopicAccordion";

const TopicSection = () => {
  return (
    <section className="border-b border-l border-r border-gray-200 dark:border-primary w-full h-[134px] tablet:h-full tablet:col-span-1 tablet:row-span-1 tablet:px-3 tablet:py-3  ">
      <h3 className="w-full h-[14px] text-[12px] tablet:text-[13px] xl-screen:text-[15px] tablet:font-bold font-bold text-primary mx-2 my-1 tablet:ml-4 tablet:mt-0 dark:text-darkTextPrimary">
        Topics
      </h3>
      <div className="w-full h-full tablet:h-[96%]  tablet:border tablet:flex tablet:border-gray-200 dark:border-primary tablet:p-2 tablet:rounded-xl overflow-y-scroll scrollbar-hide tablet:mt-3">
        <TopicAccordion />
      </div>
    </section>
  );
};

export default TopicSection;
