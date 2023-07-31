import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ data }) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const onSearch = (searchTerm) => {
        setValue(searchTerm)
        console.log('search', searchTerm);
    }
    return (
        <div className="search-container">
            <div className="search-inner">
                <input type="text" placeholder="Search songs" value={value} onChange={onChange} />
            </div>
            <div className="dropdown">
                {
                    data.map((item) => {
                        return <div className="dropdown-row">
                            {
                                item.names.filter(val => {
                                    const searchTerm = value.toLowerCase();
                                    const songName = val.name.toLowerCase();
                                    return searchTerm && songName.includes(searchTerm) && songName != searchTerm

                                })
                                    .map((subitem) => {
                                        return (
                                            <div onClick={() => onSearch(subitem.name)} className="search-result">
                                                <Link to={`/playlist/${item.id}`} >
                                                    <p onClick={() => {
                                                        setValue(subitem.name)
                                                    }}>{subitem.name}</p>
                                                </Link>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default SearchBar;