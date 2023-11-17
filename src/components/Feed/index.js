import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("jwt")) {
      alert("You need to login first!");
      navigate("/signin");
    }
  }, [])

  return (
    <div style={{minHeight:'87.3vh', marginTop:'4rem'}}>
      <h1>This is your feed</h1>
      <h3>
        Follow your favorite artists, labels and friends on SoundCloud and see
        every track they post right here.
      </h3>
    </div>
  );
};

export default Feed;
