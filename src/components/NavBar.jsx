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
import { FilteredArticlesContext } from "../contexts/FilteredArticlesContext";
import { SearchBarInputContext } from "../contexts/SearchBarInputContext";
import { SearchBarListContext } from "../contexts/SearchBarList";
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

const NavBar = ({ handleSearchInput }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user, setUser } = useContext(UserContext);
  const { input, setInput } = useContext(SearchBarInputContext);
  const { searchBarList } = useContext(SearchBarListContext);
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { toggleSearchOpen } = useSearchToggle();
  const { toggleComposeOpen } = useComposeToggle();
  const { filteredArticles } = useContext(FilteredArticlesContext);
  const { handleScrollToTop } = useContext(ArticleScrollContext);
  const { article_id } = useParams();
  const { showModal } = useModal();
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
    <nav className=" w-[100%] row-span-1 col-span-3  flex justify-between items-center border-b border-l-none border-r-none sm:border-l sm:border-r  border-gray-200 dark:border-primary dark:bg-darkBg">
      <Link to="/articles" onClick={handleScrollToTop}>
        <Logo />
      </Link>
      {width > 640 && (
        <div className="relative ml-24 z-40">
          <Input searchInput={input} handleChange={handleSearchInput} />
          {isSearchOpen ? (
            searchInputLength > 0 && filteredArticlesArr.length > 0 ? (
              <div className="top-[10px] w-[460px] max-h-[550px] shadow-xl overflow-y-auto scrollbar-hide z-30 sm:ml-8 bg-white dark:bg-secondaryBg absolute rounded-xl p-4">
                <SearchBarList
                  articles={filteredArticlesArr}
                  searchInputLength={searchInputLength}
                />
              </div>
            ) : isSearchOpen && searchInputLength < 1 ? (
              <div
                ref={extendedComponentRef}
                className="top-[10px]  w-[460px] max-h-[550px] shadow-xl overflow-y-auto sm:ml-8 bg-white dark:bg-secondaryBg absolute rounded-xl p-4 z-30 scrollbar-hide"
              >
                <SearchBarList articles={searchBarList && searchBarList} />
              </div>
            ) : (
              <div
                ref={extendedComponentRef}
                className="top-[10px] w-[460px] h-[550px]  shadow-xl overflow-y-auto sm:ml-8 bg-white dark:bg-secondaryBg  absolute rounded-xl p-4 z-30 scrollbar-hide"
              >
                <p className="text-[0.85rem] text-primary sm:ml-2 sm:pt-4">
                  No results found...
                </p>
              </div>
            )
          ) : null}
        </div>
      )}
      <div className="flex items-center mx-2.5 sm:mx-6 gap-3 sm:gap-6">
        <ThemeToggleSwitch onClick={toggleTheme} />
        {width > 640 && (
          <Button
            buttonStyle={theme === "dark" ? "buttonLargeDark" : "buttonLarge"}
            handleClick={handleSignOut}
          >
            {user.username ? "Sign Out" : "Sign In"}
          </Button>
        )}
        {width < 640 && (
          <FaSearch
            className="w-5 h-5 text-primary cursor-pointer"
            onClick={toggleSearchOpen}
          />
        )}
        {width < 640 && !article_id && (
          <IoIosAddCircle
            className="w-7 h-7 text-primary cursor-pointer"
            onClick={() => {
              !user.username && showModal(<SignIn />);
              toggleComposeOpen();
            }}
          />
        )}
        <div className="sm:w-[65px] sm:h-[65px] flex justify-center items-center">
          {user.username && width < 640 ? (
            <Avatar
              avatarURL={user.avatar_url}
              avatarStyle="avatarMobileNav sm:avatarLarge"
              handleClick={() => showModal(<SignOut />)}
            />
          ) : user.username ? (
            <Avatar
              avatarURL={user.avatar_url}
              avatarStyle="avatarMobileNav sm:avatarLarge"
            />
          ) : (
            <div>
              <CgProfile
                className="avatarMobile w-[33px] h-[33px] sm:w-[58px]  sm:h-[58px] border-none text-primary cursor-pointer"
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
