import "../../styles/Search.scss"
import { Link } from "react-router-dom"

export default function SearchCard({mal_id, type, image, title, synopsis, score, status}) {
    return (
        <Link to={`/discovery/${type}/moreInfo/${mal_id}`} className="search-page-card">
            <img src={image} alt="Image of search item"/>
            <div className="card-search-details">
                <h2>{title}</h2>
                {synopsis && <p>{synopsis.substring(0, 300)}......</p>}
                <div className="sub-search-footer">
                    <span className="rating">Rating: {score && score}</span>
                    <span className="status">Status: {status && status}</span>
                </div>
            </div>
        </Link>
    )
}