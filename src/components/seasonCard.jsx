import {Link} from "react-router-dom"
import "../styles/home.scss"

export default function SeasonCard ({title, image, id}){
    return (
        <div className="season-card">
            <Link to={`moreInfo/${id}`}>
                <img className="" />
            </Link>
            <p className="card-title"></p>
        </div>
    )
}