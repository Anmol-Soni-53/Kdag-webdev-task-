import { useState } from "react";
import { useHistory } from "react-router-dom";
import './CSS/create.css'
const Create = () => {
    const [details, setDetails] = useState({
        title: "",
        description: "",
        creator: "",
    })
    const [IsPending, setIsPending] = useState(false);
    const history = useHistory();

    const [names, setVal] = useState([{
        name: "",
        artist: "",
        votes: 0
    }]);

    const handleAdd = () => {
        const temp = [...names, { name: "", artist: "", votes: 0 }]
        setVal(temp)
    }
    const handleChange = (onChangeValue, i) => {
        const { name, value } = onChangeValue.target
        const inputdata = [...names]
        inputdata[i][name] = value;
        setVal(inputdata);
    }
    console.log(names, "data");

    const handleChange_form = (e) => {
        // const title = e.target.name;
        // const value = e.target.value;
        const { name, value } = e.target
        setDetails((prev) => { return { ...prev, [name]: value } })
    };

    const handleDelete = (i) => {
        const temp = [...names]
        temp.splice(i, 1)
        setVal(temp)
    }
    const playlist = { details, names };
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);
        setTimeout(() => {
            fetch('http://localhost:8000/playlist', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(playlist)
            }).then(() => {
                console.log('new playlist added');
                setIsPending(false);
                history.push('/');
            })

        }, 500);



    }


    return (
        <div className="create">
            <h2>Create a new playlist</h2>
            <label>playlist title</label>
            <input type="text" name='title' required onChange={handleChange_form} />
            <label >created by</label>
            <input type="text" required name='creator' onChange={handleChange_form} />
            <label >description</label>
            <textarea type="text" required name='description' onChange={handleChange_form} />
            <button onClick={() => handleAdd()} >Add songs</button>
            {
                names.map((data, i) => {
                    return (
                        <div className="add-data">
                            <input name="name" value={data.name} placeholder="Song name" onChange={(e) => handleChange(e, i)} />
                            <input name="artist" value={data.artist} placeholder="Artist name" onChange={(e) => handleChange(e, i)} />
                            <button onClick={() => handleDelete(i)} >remove</button>
                        </div>
                    );
                })
            }
            {!IsPending && <button onClick={handleSubmit}>Add playlist</button>}
            {IsPending && <button>Adding playlist</button>}

            {/* <p>{JSON.stringify(playlist)}</p> */}
        </div>

    );
}

export default Create;