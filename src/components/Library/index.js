import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as brokenHeart } from "@fortawesome/free-regular-svg-icons";

function Library() {
  const navigate = useNavigate();
  const [likedAlbums, setLikedAlbums] = useState([]);

  useEffect(() => {
    // Fetch liked albums here using an API call and setLikedAlbums with the response data.
    fetchLikedAlbums()
      .then((data) => {
        console.log(data);
        setLikedAlbums(data.data.songs)
      })
      .catch((error) => console.error("Error fetching liked albums:", error));
  }, []);

  // Function to fetch liked albums from the API (replace with your actual API call)
  const fetchLikedAlbums = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/favorites/like`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
            projectId: "f104bi07c490",
          },
        }
      );
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch liked albums: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching liked albums:", error);
      throw error;
    }
  };
  

  return (
    <div>
      <h2>Liked Albums</h2>
      <ListGroup>
        {likedAlbums.map((album) => (
          <ListGroup.Item
            key={album._id}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <img
                src={album.thumbnail}
                alt={album.title}
                style={{ marginRight: "10px", width: "50px", height: "50px" }}
              />
              <div className="album-title" style={{ marginLeft: "10px" }}>
                {album.title}
              </div>
              <div className="artist-name" style={{ marginLeft: "10px" }}>
                {album.artist}
              </div>
            </div>
            <Button variant="outline-primary" className="like-button">
              <FontAwesomeIcon
                icon={brokenHeart} // Assuming all liked albums have a filled heart icon
                className="heart-icon"
              />
              Unlike
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Library;
