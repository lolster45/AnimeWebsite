//Components...
import { useState, useEffect } from "react"
import {animateScroll as scroll} from "react-scroll"
import CardTemplate from "../components/cardTemplate"

//styles...
import "../styles/Anime.scss"

export default function AnimePage () {
    const [topAnime, setTopAnime] = useState([])
    const [filter, setFilter] = useState("airing")

    const [limit, setLimit] = useState("15")

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentAnimePage") || "1")
    localStorage.setItem("currentAnimePage", page)

    useEffect(() => {
         getTopAnime()
    }, [page, filter])

    async function getTopAnime() {
        const apiFetch = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}&page=${page}&filter=${filter}`)
        const data = await apiFetch.json();
        setTopAnime(data.data)
    }

    const handleMore = (e) => {
        scroll.scrollToTop();
        e.currentTarget.parentElement.classList.add("more");
        setPage(prev => +prev + +"1")
    }
    const handleLess = (e) => {
        scroll.scrollToTop();
        e.currentTarget.parentElement.classList.remove("more")
        setPage(prev => +prev - +"1")
    }

    return (
        <section className="anime-page">
            <nav className="anime-nav-filter">
                <h2>Top Anime</h2>
                <select onChange={(e) => {
                    setPage("1")
                    setFilter(e.target.value)
                }}>
                    <option value="bypopularity">Popularity</option>
                    <option value="airing">Airing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="favorite">Favorite</option>
                </select>
            </nav>
            {/* <h2>Top Anime </h2> */}
            <div className="anime-grid">
                {
                    topAnime?.map((item) => (
                        <CardTemplate
                            key={item.mal_id}
                            customClass="card"
                            id={item.mal_id}
                            title={item.title}
                            image={item.images.jpg.image_url}
                        />
                    ))
                }   
            </div>
            <div className="page-nav">
                {page > 1 && <button onClick={handleLess}>Go Back</button>}
                <button onClick={handleMore}>Next Page</button>
            </div>
        </section>
    )
}