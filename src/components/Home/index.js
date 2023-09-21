import React, { useEffect, useState, useRef } from "react";
import "../../styles/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import { useNavigate, useLocation } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user);
  const [state, setState] = useState({
    "Trending songs": [],
    happy: [],
    sad: [],
    excited: [],
    romantic: [],
    isPlaying: false,
    hoverId: null,
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const fetcher = (filter, value, sort, page, limit) => {
    const queryParams = {
      [filter]: value,
      sort: JSON.stringify(sort),
      page,
      limit,
    }

    const queryString = Object.keys(queryParams)
    .map((key) => key + "=" + queryParams[key])
    .join("&");

    fetch(
      `https://academics.newtonschool.co/api/v1/music/song?${queryString}`,
      {
        headers: {
          projectId: "f104bi07c490",
        },
      }
    )
      .then((data) => data.json())
      .then((json) => {
        setState((prevState) => ({ ...prevState, [value]: json.data }));
      });
  };

  useEffect(() => {
    const sortOptions = {
      release: 1,
    }

    const page = 2;
    const limit = 10;

    fetcher("featured", "Trending songs", sortOptions, page, limit);
    fetcher("mood", "happy", sortOptions, page, limit);
    fetcher("mood", "romantic", sortOptions, page, limit);
    fetcher("mood", "sad", sortOptions, page, limit);
    fetcher("mood", "excited", sortOptions, page, limit);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {


  //   if (state.isPlaying && state.soundId && state.sound) {
  //       //audioRef.current.audio.play();
  //   }

  //   if (!state.isPlaying && state.soundId && state.sound){
  //       //audioRef.current.audio.pause();
  //   }
  // }, [state.isPlaying, state.soundId]);

  const handleMouseHover = (category, id, flag) => {
    setState((prevState) => ({
      ...prevState,
      hoverId: flag ? id : null,
      hoveredCategory: category,
    }));
  };

  const handleTogglePlayPause = (event, sound) => {
    //if isLoggedin state is true then play else navigate to signin
    event.stopPropagation();
    if(window.sessionStorage.getItem("jwt")){
      setState((prevState) => ({
        ...prevState,
        soundId: sound._id,
        isPlaying: prevState.soundId !== sound._id ? true : !prevState.isPlaying,
        sound: sound,
      }));
    } else {
      alert("You need to login first!");
      navigate('/signin');
    }
    
  };

  const showAlbum = (sound) => {
    if(window.sessionStorage.getItem("jwt")){
      navigate('/album?id=' + sound.album);
    } else {
      alert("You need to login first!");
      navigate('/signin');
    }
  }

  useEffect(() => {
    // Handle the selected suggestion when the location changes
    const searchParams = new URLSearchParams(location.search);
    const selectedQuery = searchParams.get("suggestion");
    if (selectedQuery) {
      setSelectedSuggestion(selectedQuery);
    }
  }, [location]);

  const filteredContent = state[selectedSuggestion] || [];

  return (
    <div className="home">
      {/* Conditionally render filtered content or normal cards */}
      {filteredContent.length > 0 ? (
        filteredContent.map((sound, idx) => (
          <div
            className="soundCard" // Apply your existing class for styling here
            key={sound._id}
            onClick={(e) => showAlbum(sound)}
            onMouseEnter={() => handleMouseHover(selectedSuggestion, idx, true)}
            onMouseLeave={() => handleMouseHover(selectedSuggestion, idx, false)}
          >
            <img src={sound.thumbnail} alt={sound.title} />
            <div>{sound.title}</div>
            <div className="soundCard-mood">{sound.mood}</div>
            {state.hoverId === idx && state.hoveredCategory === selectedSuggestion && (
              <div
                onClick={(event) => handleTogglePlayPause(event, sound)}
                className="playIcon" // Apply your existing class for styling here
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt="PlayPauseIcon"
                  src={
                    state.isPlaying && state.soundId === sound._id
                      ? PauseIcon
                      : PlayIcon
                  }
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <>
          <div className="h1">Discover Tracks and Playlists</div>
          <div className="h3">Featured tracks</div>
          <div className="h5">The most played tracks on SoundCloud this week</div>
          <Carousel responsive={responsive}>
            {state["Trending songs"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("Trending songs", idx, true)}
                  onMouseLeave={() =>
                    handleMouseHover("Trending songs", idx, false)
                  }
                >
                  <img src={sound.thumbnail} alt={sound.title}/>
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "Trending songs" && (
                      <div
                        onClick={(event) => handleTogglePlayPause(event, sound)}
                        className="playIcon"
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          alt="PlayPauseIcon"
                          src={
                            state.isPlaying && state.soundId === sound._id
                              ? PauseIcon
                              : PlayIcon
                          }
                        />
                      </div>
                    )}
                </div>
              );
            })}
          </Carousel>
          <div className="h3">Mood: Happy songs</div>
          <Carousel responsive={responsive}>
            {state["happy"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("happy", idx, true)}
                  onMouseLeave={() => handleMouseHover("happy", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title}/>
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx && state.hoveredCategory === "happy" && (
                    <div
                      onClick={(event) => handleTogglePlayPause(event, sound)}
                      className="playIcon"
                    >
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt="PlayPauseIcon"
                        src={
                          state.isPlaying && state.soundId === sound._id
                            ? PauseIcon
                            : PlayIcon
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
          <div className="h3">Mood: Romantic songs</div>
          <Carousel responsive={responsive}>
            {state["romantic"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("romantic", idx, true)}
                  onMouseLeave={() => handleMouseHover("romantic", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title}/>
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx &&
                    state.hoveredCategory === "romantic" && (
                      <div
                        onClick={(event) => handleTogglePlayPause(event, sound)}
                        className="playIcon"
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          alt="PlayPauseIcon"
                          src={
                            state.isPlaying && state.soundId === sound._id
                              ? PauseIcon
                              : PlayIcon
                          }
                        />
                      </div>
                    )}
                </div>
              );
            })}
          </Carousel>
          <div className="h3">Mood: Excited songs</div>
          <Carousel responsive={responsive}>
            {state["excited"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("excited", idx, true)}
                  onMouseLeave={() => handleMouseHover("excited", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title}/>
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx && state.hoveredCategory === "excited" && (
                    <div
                      onClick={(event) => handleTogglePlayPause(event, sound)}
                      className="playIcon"
                    >
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt="PlayPauseIcon"
                        src={
                          state.isPlaying && state.soundId === sound._id
                            ? PauseIcon
                            : PlayIcon
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
          <div className="h3">Mood: Sad songs</div>
          <Carousel responsive={responsive}>
            {state["sad"]?.map((sound, idx) => {
              return (
                <div
                  className="soundCard"
                  onClick={(e) => showAlbum(sound)}
                  onMouseEnter={() => handleMouseHover("sad", idx, true)}
                  onMouseLeave={() => handleMouseHover("sad", idx, false)}
                >
                  <img src={sound.thumbnail} alt={sound.title}/>
                  <div>{sound.title}</div>
                  <div className="soundCard-mood">{sound.mood}</div>
                  {state.hoverId === idx && state.hoveredCategory === "sad" && (
                    <div
                      onClick={(event) => handleTogglePlayPause(event, sound)}
                      className="playIcon"
                    >
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt="PlayPauseIcon"
                        src={
                          state.isPlaying && state.soundId === sound._id
                            ? PauseIcon
                            : PlayIcon
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
        </>
      )}
  
      {state.isPlaying && state.sound && (
        <div className="audioBar">
          <div className="audio">
            <audio key={state.sound._id} autoPlay controls ref={audioRef}>
              <source src={state.sound.audio_url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Home;
