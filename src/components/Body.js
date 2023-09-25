import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex">
      <Head />
      <div className="mainContent">
        <div className="hero">
          <div className="hero-content">
            <h2 className="frontHero__title">Connect on SoundCloud</h2>
            <p className="frontHero__tagline sc-type-large sc-text-h3">
              Discover, stream, and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </p>
          </div>
        </div>
        <Outlet />
      </div>
      {/* <div className="mainContent"><Outlet /></div> */}
      <Footer />
    </div>
  );
};

export default Body;