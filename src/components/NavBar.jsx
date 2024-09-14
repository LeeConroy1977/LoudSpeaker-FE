import React, { useContext, useRef } from "react";
import Input from "./Input";
import Logo from "./Logo";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import SearchBarList from "./SearchBarList";
import useOutsideClick from "../hooks/useOutsideClick";
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

const NavBar = ({ handleSearchInput }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user, setUser } = useContext(UserContext);
  const { input, setInput } = useContext(SearchBarInputContext);
  const { searchBarList } = useContext(SearchBarListContext);
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { toggleSearchOpen } = useSearchToggle();
  const { toggleComposeOpen } = useComposeToggle();
  const { filteredArticles } = useContext(FilteredArticlesContext);
  const { article_id } = useParams();
  const { showModal } = useModal();
  const extendedComponentRef = useRef(null);

  useOutsideClick(extendedComponentRef, () => setIsSearchOpen(false));

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
    <nav className=" w-[100%] row-span-1 col-span-3  flex justify-between items-center border-b border-l border-r border-gray-200">
      <Link to="/articles">
        <Logo />
      </Link>
      {width > 640 && (
        <div className="relative">
          <Input searchInput={input} handleChange={handleSearchInput} />
          {isSearchOpen ? (
            searchInputLength > 0 && filteredArticlesArr.length > 0 ? (
              <div className="w-[460px] max-h-[500px] shadow-xl overflow-y-auto z-50 sm:ml-8 bg-white absolute rounded-xl p-4">
                <SearchBarList
                  articles={filteredArticlesArr}
                  searchInputLength={searchInputLength}
                />
              </div>
            ) : isSearchOpen && searchInputLength < 1 ? (
              <div
                ref={extendedComponentRef}
                className="w-[460px] max-h-[560px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4 z-50"
              >
                <SearchBarList articles={searchBarList && searchBarList} />
              </div>
            ) : (
              <div
                ref={extendedComponentRef}
                className="w-[460px]  shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4 z-50"
              >
                <p className="text-[0.85rem] text-primary sm:ml-2 sm:pt-4">
                  No results found...
                </p>
              </div>
            )
          ) : null}
        </div>
      )}
      <div className="flex items-center mx-2.5 sm:mx-8 gap-3 sm:gap-8">
        {width > 640 && (
          <Button buttonStyle="buttonLarge" handleClick={handleSignOut}>
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
                className="avatarMobile sm:w-[58px] sm:h-[58px] border-none text-primary cursor-pointer"
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
