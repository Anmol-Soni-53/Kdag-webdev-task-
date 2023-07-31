import useFetch from "./useFetch";
import SongList from "./songlist";

const Library = () => {
    const { data, isPending, Error } = useFetch('http://localhost:8000/playlist');
    return (
        <div className="library">
            {isPending && <div>Loading....</div>}

            {data && <SongList data={data}></SongList>}
        </div>

    );
}

export default Library;