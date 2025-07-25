import { FaRegCommentAlt } from "react-icons/fa";

const CommentsContainer = ({
  commentCount,
}) => {
  return (
    <div className="w-[60px] tablet-portrait:w-[68px] tablet:w-[63px] desktop:w-[66px] xl-screen:w-[75px] py-1.5 flex justify-center items-center rounded-full  mobile:gap-0.5 tablet-portrait:gap-0.6 desktop:gap-0.9 xl-screen:gap-1 bg-[#f3f4f6] dark:bg-secondaryBg">
      <span>
        <FaRegCommentAlt className="size-[14px] tablet-portrait:size-[15px] desktop:size-[17px]  xl-screen:size-[18px] text-primary" />
      </span>
      <p className="text-[10px] tablet-portrait:text-[11px] xl-screen:text-[14px] text-[#456990] dark:text-darkTextPrimary font-semibold ml-1">
        {commentCount}
      </p>
    </div>
  );
};

export default CommentsContainer;
