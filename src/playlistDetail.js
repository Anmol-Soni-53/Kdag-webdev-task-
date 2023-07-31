import { useHistory, useParams } from "react-router-dom";
import UseFetch from "./useFetch";
import { useState } from "react";
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
} from 'react-share';


import './CSS/details.css';


const PlaylistDetail = () => {
    const { id } = useParams();
    const { data, isPending, error, removeItem, handleAddItem, handleAddVote } = UseFetch('http://localhost:8000/playlist/' + id);
    const history = useHistory();
    const handledelete = () => {
        fetch('http://localhost:8000/playlist/' + data.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }

    const [names, setNames] = useState([{
        name: "",
        artist: "",
        votes: 0
    }]);


    const handleAdd = () => {
        const temp = [...names, { name: "", artist: "", votes: 0 }]
        setNames(temp)
    }

    const handleChange = (e, i) => {
        const { name, value } = e.target
        const inputsongs = [...names]
        inputsongs[i][name] = value;
        setNames(inputsongs);
    }

    const handleSongDelete = (i) => {
        const temp = [...names]
        temp.splice(i, 1)
        setNames(temp)
    }

    const handlesave = async () => {
        handleAddItem(names, data)
        setNames([{
            name: "",
            artist: "",
            votes: 0
        }])
    }


    return (
        <div className="playlist-detail">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {
                data && <div>
                    <h2 className="Title">{data.details.title}</h2>
                    <p className="creator" >{"made by "}{data.details.creator}</p>
                    <p className="description" >{data.details.description}</p>
                    <ol className="song-names">
                        {
                            data.names.map((sub, i) =>
                                <li key={sub.name} className="list-item">
                                    <p>{sub.name}</p>
                                    <p>Artist - {sub.artist}</p>
                                    {/* <p>votes-{arr[i]}</p> */}
                                    <p>votes-{sub.votes}</p>
                                    <button onClick={() => handleAddVote(data, i)}>Add Vote</button>
                                    <button onClick={() => removeItem(data, sub)} value={i}>Remove</button>
                                </li>
                            )
                        }
                    </ol>
                </div>

            }
            <button className="add-button" onClick={handleAdd} >Add songs</button>
            {
                names.map((value, i) => {
                    return (
                        <div className="add-songs">
                            <input placeholder="Song" name="name" value={value.name} type="text" onChange={(e) => handleChange(e, i)} />
                            <input placeholder="artist" name="artist" value={value.artist} type="text" onChange={(e) => handleChange(e, i)} />
                            <button onClick={() => handleSongDelete(i)} >Remove</button>
                        </div>
                    )
                })
            }
            <button className="save-button" onClick={handlesave}>save</button>

            <button className="delete-playlist" onClick={handledelete}>Delete Playlist</button>
            {/* <p>{JSON.stringify(newData)}</p> */}
            <footer>
                <FacebookShareButton
                    url={'http://localhost:8000/playlist/' + id}
                    quote={'listen to this awesome playlist'}
                    hashtag={'#portfolio...'}
                    className="fb-button"
                >
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <WhatsappShareButton
                    className="wp-button"
                    url={'http://localhost:8000/playlist/' + id}
                    quote={'listen to this awesome playlist'}
                    hashtag={'#portfolio...'}
                >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
            </footer>
        </div>

    );
}

export default PlaylistDetail;