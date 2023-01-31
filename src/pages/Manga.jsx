import coolImg from "../images/cool.png"

//Components...
import { useState, useEffect } from "react"
import CardTemplate from "../components/cardTemplate"

//Styles...
import "../styles/Manga.scss"

export default function Manga () {
    const [topManhwa, setTopManhwa] = useState([])
    const [filter, setFilter] = useState("bypopularity")
    const [limit, setLimit] = useState("15")

    const [page, setPage] = useState(localStorage.getItem("currentMangaPage") || "1")
    localStorage.setItem("currentMangaPage", page)

    useEffect(() => {
         getTopManhwa()
    }, [page, filter])

    async function getTopManhwa() {
        const apiFetch = await fetch(`https://api.jikan.moe/v4/top/manga?type=manga&filter=${filter}&limit=${limit}&page=${page}`)
        const data = await apiFetch.json();
        setTopManhwa(data.data)
    }

    const handleMore = (e) => {
        e.currentTarget.parentElement.classList.add("more");
        setPage(prev => +prev + +"1")
    }
    const handleLess = (e) => {
        e.currentTarget.parentElement.classList.remove("more")
        setPage(prev => +prev - +"1")
    }

    

    return (
        <section className="manga-page">
        <header>
            <h2>Top Manga</h2>
            <select onChange={(e) => {
                setPage("1")
                setFilter(e.target.value)
            }}>
                <option value="bypopularity">Popularity</option>
                <option value="publishing">Publishing</option>
                <option value="upcoming">Upcoming</option>
                <option value="favorite">Favorite</option>
            </select>
        </header>
        {/* <h2>Top Anime </h2> */}
        <div className="manhwa-grid">
            {
                topManhwa.map(item => (
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

