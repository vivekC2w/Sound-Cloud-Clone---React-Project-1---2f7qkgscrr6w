import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import Footer from "./Footer";

const Body = () => {
    return (
        <div className="flex">
            <Head />
            <div className="mainContent"><Outlet /></div>
            <Footer />
        </div>
    )
}

export default Body;