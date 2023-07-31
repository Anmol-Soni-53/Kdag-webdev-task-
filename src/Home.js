// import { useState } from "react";
// import SongList from "./songlist";
// import useFetch from "./useFetch";

import './CSS/home.css';
const Home = () => {

    // const { data, isPending, Error } = useFetch('http://localhost:8000/playlist');

    return (
        <header className="header">
            <div class="text-box">
                <h1 class="primary-heading">
                    <span class="primary-main">music</span>
                    <span class="primary-sub"> is the medicine of the mind</span>
                </h1>
            </div>

        </header>
    );
}
export default Home;