import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../wrapperComponent/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import "./style.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrolling = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY)
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, [lastScrollY]);

  const handleShowSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handleMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const handleNavigationFunc = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  return (
    <header className={`${mobileMenu && "mobileView"} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => handleNavigationFunc("movies")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => handleNavigationFunc("tv")}>
            TV Shows
          </li>
          <li className="menuItem icon">
            <HiOutlineSearch onClick={handleShowSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={handleShowSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={handleMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
