import React, { useContext, useEffect, useRef } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Input from "./Input";
import Logo from "./Logo";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import SearchBarList from "./SearchBarList";
import useOutsideClick from "../hooks/useOutsideClick";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "./SignIn";

const NavBar = ({
  handleSearchOpen,
  handleComposeOpen,
  handleSearchInput,
  searchInput,
  filteredArticles,
  popularArticles,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const { width } = useContext(ScreenSizeContext);
  const { user, setUser } = useContext(UserContext);
  const { showModal } = useModal();

  const extendedComponentRef = useRef(null);

  useOutsideClick(extendedComponentRef, () => setIsSearchOpen(false));

  useEffect(() => {}, [searchInput]);

  const searchInputLength = searchInput.length;

  function handleSignOut() {
    if (!user.username) {
      return showModal(<SignIn />);
    }
    if (user.username) {
      return setUser({});
    }
  }

  return (
    <nav className=" row-span-1 col-span-3  flex justify-between items-center border-b border-l border-r border-gray-200">
      <Link to="/articles">
        <Logo />
      </Link>
      {width > 640 && (
        <div className="relative">
          <Input
            handleSearchOpen={handleSearchOpen}
            searchInput={searchInput}
            handleChange={handleSearchInput}
          />
          {isSearchOpen ? (
            searchInputLength > 0 && filteredArticles.length > 0 ? (
              <div className="w-[460px] max-h-[500px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4">
                <SearchBarList
                  articles={filteredArticles}
                  searchInputLength={searchInputLength}
                />
              </div>
            ) : isSearchOpen && searchInputLength < 1 ? (
              <div
                ref={extendedComponentRef}
                className="w-[460px] max-h-[560px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4"
              >
                <SearchBarList articles={popularArticles && popularArticles} />
              </div>
            ) : (
              <div
                ref={extendedComponentRef}
                className="w-[460px] h-[560px] shadow-xl overflow-y-auto sm:ml-8 bg-white absolute rounded-xl p-4"
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
            onClick={handleSearchOpen}
          />
        )}
        {width < 640 && (
          <IoIosAddCircle
            className="w-7 h-7 text-primary"
            onClick={() => handleComposeOpen()}
          />
        )}
        <div className="sm:w-[65px] sm:h-[65px] flex justify-center items-center">
          {user.username ? (
            <Avatar
              avatarURL={user.avatar_url}
              avatarStyle="avatarMobile sm:avatarLarge"
            />
          ) : (
            <div>
              <CgProfile
                className="avatarMobile sm:w-[58px] sm:h-[58px] border-none text-primary"
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
