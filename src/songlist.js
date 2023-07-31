
import { Link } from "react-router-dom";
import './CSS/list.css'

const SongList
    = ({ data }) => {
        return (
            <div className="container">
                <h1>ALL PLAYLIST</h1>
                {
                    data.map(value => {
                        return <div className="playlist-preview" key={value.id}>
                            <Link to={`/playlist/${value.id}`} >
                                <p>{value.details.title}</p>
                            </Link>
                            <p>created by {value.details.creator}</p>
                        </div>
                    })
                }
            </div>
        );
    }

export default SongList;