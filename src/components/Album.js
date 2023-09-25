import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ReactAudioPlayer from "react-audio-player";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as brokenHeart } from "@fortawesome/free-regular-svg-icons";

function Album() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    if (window.sessionStorage.getItem("jwt")) {
      if (params.get("id")) {
        fetch(
          `https://academics.newtonschool.co/api/v1/music/album/${params.get(
            "id"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              projectId: "f104bi07c490",
            },
          }
        )
          .then((data) => data.json())
          .then((json) => {
            console.log(json);
            setData(json.data);
          });
      }
    } else {
      alert("You need to login first!");
      navigate("/signin");
    }
  }, [navigate]);

  const playNextTrack = () => {
    if (currentTrackIndex < data.songs.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const toggleLike = (songId) => {
    setLiked(!liked);
    // const songId = data.songs[currentTrackIndex]._id;
    const action = favorites.includes(songId) ? "remove" : "add";
    fetch(`https://academics.newtonschool.co/api/v1/music/favorites/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
        projectID: "f104bi07c490",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songId,
        // action,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          // Update favorites state
          if (action === "add") {
            setFavorites([...favorites, songId]);
          } else {
            setFavorites(favorites.filter((id) => id !== songId));
          }
        }
      });
  };

  useEffect(() => {
    if (data.songs && data.songs.length > 0) {
      // Check if the current song is in favorites
      const currentSongId = data.songs[currentTrackIndex]._id;
      setLiked(favorites.includes(currentSongId));
    }
  }, [currentTrackIndex, data.songs, favorites]);

  return (
    <>
      <div className="audio-player p-4 bg-gray-200 rounded-lg shadow-lg">
        {data.songs && data.songs.length > 0 && (
          <ReactAudioPlayer
            src={data.songs[currentTrackIndex].audio_url}
            autoPlay
            controls
            onEnded={playNextTrack}
          />
        )}

        <div className="track-details d-flex align-items-center justify-content-between">
          {data.songs && data.songs.length > 0 && (
            <>
              <div className="d-flex align-items-center">
                <img
                  src={data.songs[currentTrackIndex].thumbnail}
                  alt={data.songs[currentTrackIndex].title}
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div className="song-title">
                  {data.songs[currentTrackIndex].title}
                </div>
                <div className="artist-name">
                  {data.artists[0].name}{" "}
                  {/* Assuming one artist for simplicity */}
                </div>
              </div>
              <Button
                variant="outline-primary"
                className="like-button"
                onClick={() => toggleLike(data.songs[currentTrackIndex]._id)}
              >
                <FontAwesomeIcon
                  icon={liked ? solidHeart : brokenHeart}
                  className="heart-icon"
                />
                {liked ? "Liked" : "Like"}
              </Button>
            </>
          )}
        </div>
      </div>

      <ListGroup>
        {data.songs &&
          data.songs.map((song, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  style={{ marginRight: "10px", width: "50px", height: "50px" }}
                />
                <div className="song-number">{index + 1}</div>
                <div className="song-title" style={{ marginLeft: "10px" }}>
                  {song.title}
                </div>
                <div className="artist-name" style={{ marginLeft: "10px" }}>
                  {data.artists[0].name}
                </div>
              </div>
              <Button
                variant="outline-primary"
                className="like-button"
                onClick={() => toggleLike(song._id)}
              >
                <FontAwesomeIcon
                  icon={favorites.includes(song._id) ? solidHeart : brokenHeart}
                  className="heart-icon"
                />
                {favorites.includes(song._id) ? "Liked" : "Like"}
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}

export default Album;