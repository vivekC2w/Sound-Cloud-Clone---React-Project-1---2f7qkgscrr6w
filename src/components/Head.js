import React from "react";

const Head = () => {
  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg">
      <div className="flex col-span-1">
        <a href="/">
          <img
            className="h-9 mx-1"
            alt="videoclone-logo"
            src="http://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Player-Video-icon.png"
          />
        </a>
        <h1 className="font-extrabold text-lg h-9 mx-1">MyVideoClone</h1>
      </div>
      <div className="col-span-10 px-10">
        <input
          className="px-5 w-1/2 border border-gray-400 p-1 rounded-l-full"
          type="text"
        />
        <button className="border border-gray-400 p-1 rounded-r-full px-2 bg-gray-100">
          🔍
        </button>
      </div>
      <div className="col-span-1">
        <img
          className="h-9"
          alt="user-icon"
          src="https://www.nicepng.com/png/full/128-1280406_user-icon-png.png"
        />
      </div>
    </div>
  );
};

export default Head;
