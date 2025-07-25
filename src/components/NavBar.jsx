import React, { useContext, useRef } from "react";
import Input from "./Input";
import Logo from "./Logo";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import SearchBarList from "./SearchBarList";
import useOutsideClickSearch from "../hooks/useOutsideClickSearch";
import SignIn from "./SignIn";
import { Link, useParams } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { UserContext } from "../contexts/UserContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchBarInputContext } from "../contexts/SearchBarInputContext";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import useSearchToggle from "../hooks/UseSearchOpenToggle";
import useComposeToggle from "../hooks/UseComposeOpenToggle";
import SignOut from "./SignOut";
import { ArticleScrollContext } from "../contexts/ArticleScrollContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { PostCommentOpenContext } from "../contexts/PostCommentOpenContext";
import { ArticlesContext } from "../contexts/ArticlesContext";

const NavBar = ({ handleSearchInput }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user, setUser } = useContext(UserContext);
  const { input, setInput } = useContext(SearchBarInputContext);

  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { setIsPostCommentOpen } = useContext(PostCommentOpenContext);
  const {
    state: { popularArticles, filteredArticles },
  } = useContext(ArticlesContext);
  const { toggleSearchOpen } = useSearchToggle();
  const { toggleComposeOpen } = useComposeToggle();
  const { handleScrollToTop } = useContext(ArticleScrollContext);
  const { article_id } = useParams();
  const { showModal, isModalOpen } = useModal();
  const extendedComponentRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useOutsideClickSearch(extendedComponentRef, () => setIsSearchOpen(false));

  const searchInputLength = input.length;

  function handleSearchInput(e) {
    setInput(e.target.value);
  }

  function handleSignOut() {
    if (!user.username) {
      return showModal(<SignIn />);
    }
    if (user.username) {
      return setUser({});
    }
  }

  let filteredArticlesArr = [];

  filteredArticles &&
    filteredArticles.filter((article) => {
      if (article.body.toLowerCase().includes(input.toLowerCase())) {
        filteredArticlesArr.push(article);
      }
    });

  return (
    <nav className="relative w-[100%] laptop:w-90vw  row-span-1 col-span-3 tablet-portrait:px-4  flex justify-between items-center border-b border-l-none border-r-none laptop:border-l laptop:border-r  border-gray-200 dark:border-primary dark:bg-darkBg">
      <Link to="/articles" onClick={handleScrollToTop}>
        <Logo />
      </Link>
      {width > 900 && (
        <div
          className={`${
            !isModalOpen ? "z-40" : "z-0"
          } absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  tablet:w-[420px] desktop:w-[460px] xl-screen:w-[560px]`}>
          <Input searchInput={input} handleChange={handleSearchInput} />
          {isSearchOpen ? (
            searchInputLength > 0 && filteredArticlesArr.length > 0 ? (
              <div className="top-[10px]  tablet:w-[380px] desktop:w-[450px] xl-screen:w-[560px]  tablet:max-h-[550px] desktop:max-h-[600px] xl-screen:max-h-[700px]  shadow-xl overflow-y-auto scrollbar-hide z-30  bg-white dark:bg-secondaryBg absolute rounded-xl p-4">
                <SearchBarList
                  articles={filteredArticlesArr}
                  searchInputLength={searchInputLength}
                />
              </div>
            ) : isSearchOpen && searchInputLength < 1 ? (
              <div
                ref={extendedComponentRef}
                className="top-[10px]  tablet:w-[380px] desktop:w-[450px] xl-screen:w-[560px]  tablet:max-h-[550px] desktop:max-h-[600px] xl-screen:max-h-[1000px] shadow-xl overflow-y-auto  bg-white dark:bg-secondaryBg absolute rounded-xl p-4 z-30 scrollbar-hide">
                <SearchBarList articles={popularArticles} />
              </div>
            ) : (
              <div
                ref={extendedComponentRef}
                className="top-[10px]  tablet:w-[380px] desktop:w-[450px] xl-screen:w-[560px]  tablet:min-h-[550px] desktop:min-h-[600px] xl-screen:min-h-[700px]  shadow-xl overflow-y-auto  bg-white dark:bg-secondaryBg  absolute rounded-xl p-4 z-30 scrollbar-hide">
                <p className="text-[0.85rem] desktop:text-[1rem] text-primary tablet:ml-2 tablet:pt-4 tablet:mt-4">
                  No results found...
                </p>
              </div>
            )
          ) : null}
        </div>
      )}
      <div className="flex items-center mx-2.5 tablet:mx-0 desktop:mx-8 tablet:mr-6 desktop:mr-8   gap-3 tablet-portrait:gap-5 tablet:gap-4 desktop:gap-6">
        <ThemeToggleSwitch onClick={toggleTheme} />
        {width > 900 && (
          <Button
            buttonStyle={
              theme === "dark"
                ? "tablet:buttonMediumDark desktop:buttonLargeDark"
                : "tablet:buttonMedium desktop:buttonLarge"
            }
            handleClick={handleSignOut}>
            {user.username ? "Sign out" : "Sign in"}
          </Button>
        )}
        {width < 900 && (
          <FaSearch
            className="w-5 h-5 text-primary cursor-pointer"
            onClick={toggleSearchOpen}
          />
        )}
        {width < 900 && !article_id && (
          <IoIosAddCircle
            className="w-7 h-7 text-primary cursor-pointer"
            onClick={() => {
              !user.username && showModal(<SignIn />);
              setIsPostCommentOpen(true);
              toggleComposeOpen();
            }}
          />
        )}
        <div className="tablet:w-[65px] tablet:h-[65px] flex justify-center items-center">
          {user.username && width < 900 ? (
            <Avatar
              avatarURL={user.avatar_url}
              avatarStyle="avatarMobileNav sm:avatarLarge "
              handleClick={() => showModal(<SignOut />)}
            />
          ) : user.username ? (
            <Avatar
              avatarURL={user.avatar_url}
              avatarStyle="avatarMobileNav tablet:avatarMedium desktop:avatarLarge cursor-pointer"
            />
          ) : (
            <div>
              <CgProfile
                className="avatarMobile w-[33px] h-[33px] tablet:w-[46px] tablet:h-[46px] desktop:w-[58px]  desktop:h-[58px] border-none text-primary cursor-pointer"
                onClick={() => showModal(<SignIn />)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
