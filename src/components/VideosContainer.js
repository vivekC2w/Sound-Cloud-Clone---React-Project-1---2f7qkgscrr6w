import React, { useEffect, useState } from "react";
import { VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObject, clearObject } from '../utils/objectSlice';


const VideosContainer = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const myObject = useSelector((state) => state.object);

  useEffect(() => {
    getVideos();
    
    console.log(myObject);
  }, [page]);

  const getVideos = async () => {
    const data = await fetch(`${VIDEOS_API}?page=${page}`);
    const json = await data.json();
    // console.log(json.data.posts);
    setVideos(json.data.posts);
    dispatch(setObject(json.data.posts));
    // console.log(myObject);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap">
        {videos.map((video) => (
          <Link to={`/watch?v=${video.postId}`} key={video.postId}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center my-4 w-full">
        <button
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <span className="text-xl mx-4">Page {page + 1}</span>
        <button
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleNextPage}
        >
          NextPage
        </button>
      </div>
    </div>
  );
};

export default VideosContainer;
