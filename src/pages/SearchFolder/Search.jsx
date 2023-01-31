//Components...
import { useState, useEffect } from "react";
import SearchCard from "./SearchCard";

//React redux toolkit...
import {useSelector } from "react-redux";

//Styles...
import "../../styles/Search.scss"


export default function Search() {
    //Gets the search input from user using react redux...
    const searchString = useSelector((state) => state.search.value.type)

    const [searchResults, setSearchResults] = useState([])

    const getSearchResults = async () => {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchString}`)
        const data = await res.json()
        setSearchResults(data.data)
    }

    useEffect(() => {
        getSearchResults()
    }, [searchString])

    return (
       <section className="search-page">
            <h1>Results...</h1>
            {
                searchResults.map((item,i) => (
                    <SearchCard
                        key={i}
                        mal_id = {item.mal_id}
                        type = "anime"
                        image = {item.images?.jpg?.image_url}
                        title = {item.title}
                        synopsis= {item.synopsis}
                        status= {item.state}
                        score= {item.score}
                    />
                ))
            }
        </section>
    )
}