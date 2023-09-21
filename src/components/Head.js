import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Logo from "../assets/logo.png";
import Icon from "../assets/icon.svg";
import { Link, json, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";

function Head() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const { logOut } = useUserAuth();

  useEffect(() => {
    //make an api call after every key press
    //but if the difference between 2 API calls is < 200ms
    //decline the API call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  //press key -> render the component -> useEffect() -> start a timer-
  //make an api call after 200ms
  //this search is using live api, debouncing, caching
  const getSearchSuggestions = async () => {
    console.log(searchQuery);
    const data = await fetch(
      `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`
    );
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSearchResultClick = (selectedQuery) => {
    // Navigate to the Home component with the selected search query as a query parameter
    navigate(`/home?query=${selectedQuery}`);
  };

  return (
    <header className="header-container">
      <div className="header">
        <div className="header-1">
          <img className="header-icon" alt="header-icon" src={Icon} />
          <img src={Logo} alt="header-logo" />
        </div>
        <div className="header-2">
          <Link to={"/home"}>Home</Link>
        </div>
        <div className="header-2">
          <Link to={"/feed"}>Feed</Link>
        </div>
        <div className="header-2">
          <Link to={"/library"}>Library</Link>
        </div>
        <div className="header-3">
          <div className="header-search-container">
            <input
              className="header-search"
              type="search"
              alt="search-songs"
              placeholder="Search for artists, bands, tracks, podcasts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            {showSuggestions && (
              <div className="header-search-suggestions">
                <ul>
                  {suggestions.map((s) => (
                    <li key={s} onClick={() => handleSearchResultClick(s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="header-signin">
          <button onClick={handleSignInClick}>Sign In</button>
        </div>
        <div className="header-createAcc">
          <button onClick={handleCreateAccountClick}>Create Account</button>
        </div>
        <div className="header-upload">Upload</div>
        <div className="header-overflow">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="header-signin">
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </header>
  );
}

export default Head;
