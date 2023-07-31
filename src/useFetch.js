import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);



    const removeItem = async (data, itemId) => {
        const temp = data.names.filter((item) => item.name !== itemId.name)
        setData({ ...data, names: temp })

        try {
            await fetch(`http://localhost:8000/playlist/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error(e);
        }

    };

    const handleAddItem = async (names, data) => {
        var names = data.names.concat(names);
        setData({ ...data, names: names })

        try {
            await fetch(`http://localhost:8000/playlist/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error(e);
        }
    }


    const handleAddVote = async (data, i) => {

        var names = data.names;
        names[i].votes = names[i].votes + 1

        setData({ ...data, names: names })
        try {
            await fetch(`http://localhost:8000/playlist/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        const abortcont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortcont.signal })
                .then(res => {
                    debugger;
                    if (!res.ok) { //error coming back from the server
                        throw Error("could not fetch the data for that resource");
                    }
                    return res.json();
                })
                .then(data => {
                    debugger;

                    setisPending(false);
                    setData(data);
                    setisPending(false);
                })
                .catch(err => {
                    debugger;
                    // auto catches netwok / connection error
                    if (err.name == 'AbortError') {
                        console.log('fetch Aborted');
                    };
                    setisPending(false);
                    setError(err.message);
                })

        }, 1000);
        return () => console.log('cleanup');

    }, [url]);
    return { data, isPending, error, removeItem, handleAddItem, handleAddVote }

}

export default UseFetch;