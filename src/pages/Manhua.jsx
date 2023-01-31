//Components...
import { useState, useEffect } from "react"
import {animateScroll as scroll} from "react-scroll"
import CardTemplate from "../components/cardTemplate"

//styles...
import "../styles/Anime.scss"

export default function ManhuaPage () {
    const [topManhua, setTopManhua] = useState([])
    const [limit, setLimit] = useState("15")

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentManhuaPage") || "1")
    localStorage.setItem("currentManhuaPage", page)

    useEffect(() => {
         getTopManhua()
    }, [page])
    

    async function getTopManhua() {
        const apiFetch = await fetch(`https://api.jikan.moe/v4/top/manga?type=manhua&limit=${limit}&page=${page}`)
        const data = await apiFetch.json();
        setTopManhua(data.data)
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
                <h2>Top Manhua</h2>
            </nav>
            <div className="anime-grid">
                {
                    topManhua.map((item) => (
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