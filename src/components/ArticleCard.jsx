import { useContext, memo } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Avatar from "../reuseable-components/Avatar";
import CommentsContainer from "../reuseable-components/CommentsContainer";
import VotesContainer from "../reuseable-components/VotesContainer";
import CommentPostContainer from "./CommentPostContainer";
import ArticleCommentsList from "./ArticleCommentsList";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import UserDetail from "../reuseable-components/UserDetail";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { CommentsContext } from "../contexts/CommentsContext";

const ArticleCard = memo(() => {
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const {
    state: { totalComments, comments },
  } = useContext(CommentsContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const {
    state: { selectedArticle, loading, error },
  } = useContext(ArticlesContext);
  const { voteCount } = useContext(VoteCountContext);
  const navigate = useNavigate();

  const userObj = existingUsers?.find(
    (user) => user?.username === selectedArticle?.author
  );
  const userAvatar = userObj ? userObj.avatar_url : null;
  const name = userObj ? userObj.name : "";

  return (
    <div
      className={`${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-50" : ""
      }`}>
      <div
        className="flex items-center mt-4 cursor-pointer"
        onClick={() => navigate(-1)}>
        <IoArrowBack className="cursor-pointer ml-4 text-primary font-bold" />
        <p className="ml-4 text-[12px] text-primary font-bold">Back...</p>
      </div>
      {loading && (
        <div className="flex items-center justify-center w-full h-[300px] sm:h-[600px]">
          <LoadingSpinner />
        </div>
      )}
      {!loading && selectedArticle && (
        <div>
          <div className="w-full border-b border-gray-200 dark:border-primary p-3 cursor-pointer">
            <div className="flex items-center mt-1 ml-1">
              {userAvatar && width < 640 && (
                <Avatar
                  avatarStyle="avatarMobile"
                  avatarStyleDesktop="avatarMain"
                  avatarURL={userAvatar}
                />
              )}
              {userAvatar && width > 640 && (
                <Avatar avatarStyle="avatarMain" avatarURL={userAvatar} />
              )}
              <UserDetail
                createdAt={selectedArticle?.created_at}
                username={selectedArticle?.author}
                name={name}
              />
              <div className="flex justify-end ml-auto w-[100px] mr-1">
                <CommentsContainer
                  commentStyle="mobileComments dark:bg-secondaryBg"
                  commentsNumStyle="mobileCommentsNum dark:text-darkTextPrimary"
                  commentsIconStyle="mobileCommentsIcon dark:text-darkTextPrimary"
                  commentCount={totalComments}
                />
                <VotesContainer
                  votesStyle="mobileVotes dark:bg-secondaryBg"
                  votesNumStyle="mobileVotesNum dark:text-darkTextPrimary"
                  votesIconStyle="mobileVotesIcon"
                  initialVotes={selectedArticle?.votes}
                  article={selectedArticle}
                  handleShouldSignIn={true}
                />
              </div>
            </div>
            <h3 className="font-semibold text-[0.9rem] ml-1 sm:ml-1 mt-3 sm:mt-3 sm:pb-1 font-sans text-gray-950 dark:text-darkTextPrimary">
              {selectedArticle?.title}
            </h3>
            <img
              src={selectedArticle?.article_img_url}
              alt=""
              className="w-full h-[200px] sm:w-[100%] sm:h-[330px] mt-2 sm:mt-1 mb-1 ml-1 sm:ml:2 pr-2 sm:pr:0 rounded-xl cursor-pointer"
            />
            <p className="sm:mr-2 ml-1 sm:ml-2 mr-1 mt-3 sm:mt-3 text-gray-950 dark:text-darkTextPrimary text-[0.825rem] sm:text-[0.9rem] font-500">
              {selectedArticle?.body}
            </p>
          </div>
          <div>
            <CommentPostContainer />
            <ArticleCommentsList />
          </div>
        </div>
      )}
    </div>
  );
});

export default ArticleCard;
