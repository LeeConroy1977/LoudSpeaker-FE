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
import { ArticlesContext } from "../contexts/ArticlesContext";
import { CommentsContext } from "../contexts/CommentsContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";

const ArticleCard = memo(() => {
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const {
    state: { totalComments },
  } = useContext(CommentsContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const {
    state: { selectedArticle, loading },
    fetchArticles,
    handleLikeArticle,
    handleUnlikeArticle,
  } = useContext(ArticlesContext);
  const navigate = useNavigate();

  const userObj = existingUsers?.find(
    (user) => user?.username === selectedArticle?.author
  );
  const userAvatar = userObj ? userObj.avatar_url : null;
  const name = userObj ? userObj.name : "";

  function handleNavigation() {
    console.log("Navigating back, fetching articles");
    fetchArticles("", "", "", null, null);
    navigate(-1);
  }

  async function handleVoteChange(voteChange) {
    try {
      const response =
        voteChange > 0
          ? await handleLikeArticle(selectedArticle?.article_id, voteChange)
          : await handleUnlikeArticle(selectedArticle?.article_id, voteChange);
      return response;
    } catch (error) {
      console.error(
        "Error updating article votes:",
        error.message,
        error.stack
      );
      throw error;
    }
  }

  return (
    <div
      className={`${
        isSearchOpen && width < 900 ? "bg-black bg-opacity-50" : ""
      } tablet-portrait:px-3`}>
      <div
        className="flex items-center mt-4 cursor-pointer"
        onClick={handleNavigation}>
        <IoArrowBack className="cursor-pointer ml-4 text-primary font-bold" />
        <p className="ml-4 text-[12px] tablet-portrait:text-[13px] desktop:text-[14px] xl-screen:text-[15px] text-primary font-bold">
          Back...
        </p>
      </div>
      {loading && (
        <div className="flex items-center justify-center w-full h-[300px] tablet:h-[600px]">
          <LoadingSpinner />
        </div>
      )}
      {!loading && selectedArticle && (
        <div>
          <div className="w-full border-b border-gray-200 dark:border-primary p-3 desktop:p-4 cursor-pointer">
            <div className="flex items-center mt-1 ml-1">
              {userAvatar && width < 900 && (
                <Avatar
                  avatarStyle="avatarMobile"
                  avatarStyleDesktop="avatarMain"
                  avatarURL={userAvatar}
                />
              )}
              {userAvatar && width > 900 && (
                <Avatar avatarStyle="avatarMain" avatarURL={userAvatar} />
              )}
              <UserDetail
                createdAt={selectedArticle?.created_at}
                username={selectedArticle?.author}
                name={name}
              />
              <div className="flex justify-end ml-auto w-[130px] tablet-portrait:w-[200px]  tablet:w-[140px] desktop:w-[200px] h-full mr-1 gap-2 desktop:gap-3">
                <CommentsContainer
                  commentStyle="mobileComments dark:bg-secondaryBg"
                  commentsNumStyle="mobileCommentsNum dark:text-darkTextPrimary"
                  commentsIconStyle="mobileCommentsIcon dark:text-darkTextPrimary"
                  commentCount={totalComments}
                />
                <VotesContainer
                  votesIconStyle="mobileVotesIcon"
                  initialVotes={selectedArticle?.votes}
                  article={selectedArticle}
                  handleShouldSignIn={true}
                  handleClick={handleVoteChange}
                />
              </div>
            </div>
            <h3 className="font-semibold text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] desktop:text-[1.1rem] xl-screen:text-[1.2rem] ml-1 tablet:ml-1 mt-3 tablet:mt-3 tablet:pb-1 xl-screen:mt-4 font-sans text-gray-950 dark:text-darkTextPrimary">
              {selectedArticle?.title}
            </h3>
            <img
              src={selectedArticle?.article_img_url}
              alt=""
              className="w-full h-[200px] tablet-portrait:h-[340px] tablet:w-[100%] tablet:h-[330px] desktop:h-[380px] xl-screen:h-[420px] mt-2 tablet-portrait:mt-3 desktop:mt-4 tablet:mt-1 mb-1 ml-1 tablet:ml:2 pr-2 tablet:pr:0 rounded-xl cursor-pointer"
            />
            <p className="tablet:mr-2 ml-1 tablet:ml-2 mr-1 mt-3 tablet:mt-3 desktop:mt-4 text-gray-950 dark:text-darkTextPrimary text-[0.825rem] tablet-portrait:text-[0.9rem] tablet:text-[0.9rem] desktop:text-[1rem] font-500">
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
