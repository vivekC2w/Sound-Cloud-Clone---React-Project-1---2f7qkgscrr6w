import React from "react";

const VideoCard = ({info}) => {
    // console.log(info);
    const {creator, reaction, submission} = info;
    const {thumbnail} = submission;
    const {handle, name} = creator;

    return (
        <div className="p-2 m-2 w-72 shadow-lg bg-white rounded-lg overflow-hidden">
          <img className="rounded-lg" alt="thumbnail" src={thumbnail} />
          <div className="p-2">
            <h2 className="text-lg font-bold py-2">{name}</h2>
            <p className="text-gray-600">{handle}</p>
            <p className="text-gray-600">{reaction.count} views</p>
          </div>
        </div>
      );
      
};

export default VideoCard;
