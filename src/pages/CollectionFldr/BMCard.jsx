//React router...
import { Link } from "react-router-dom";

//React redux...
import { useDispatch } from "react-redux";
import {nameInput} from "../../store"

//Styles...
import "../../styles/Collection.scss"

export default function BMCard ({image, title, synopsis, score, status, mal_id, type}) {
    const dispatch = useDispatch()

    const handleAnimeClick = () => {
        dispatch(nameInput({type: type}))
    }
    return (
        <Link 
            to={`/discovery/${type}/moreInfo/${mal_id}`} 
            onClick={handleAnimeClick}
            className="card-container"
        >
            <img src={image} alt="cover image of bookmarked item you have"/>
            <div className="card-details">
                <h2>{title}</h2>
                <p>{synopsis.substring(0, 300)}......</p>
                <div className="sub-footer">
                    <span className="rating">Rating: {score}</span>
                    <span className="status">Status: {status}</span>
                </div>
            </div>
        </Link>
    )
}