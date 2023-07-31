import SearchBar from "./searchbar";
import useFetch from "./useFetch";
import './CSS/navbar.css';
import img from './imgs/logo1-removebg-preview.png';

import { Link } from "react-router-dom";
const Navbar = () => {
    const { data: playlist, isPending, Error } = useFetch('http://localhost:8000/playlist');
    return (
        <div className="navbar">
            <div className="main-heading">
                <h1>The music playlist</h1>
            </div>
            <div className="logo-box">
                <img src={img} alt="" className='logo' />
            </div>
            <div className="searchbar">
                {playlist && <SearchBar data={playlist}></SearchBar>}
            </div>
            <div className="links">
                <Link to="/"> Home</Link>
                <Link to="/library">Your Library</Link>
                <Link to="/create"> New Playlist</Link>

            </div>
        </div>

    );
}

export default Navbar;