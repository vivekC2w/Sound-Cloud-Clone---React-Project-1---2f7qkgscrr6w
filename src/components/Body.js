import React from "react";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Outlet />
    </div>
  );
};

export default Body;
