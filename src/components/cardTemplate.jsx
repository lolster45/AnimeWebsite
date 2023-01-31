import "../styles/Manga.scss"
//import "../styles/SideMenu.scss"
import {Link} from "react-router-dom"
import { nameInput } from "../store"
import { useDispatch } from "react-redux"


export default function CardTemplate ({title, image, id, customClass, sidebar, firstTag, secondTag, thirdTag}){

    const dispatch = useDispatch();

    const handleAnimeClick = () => {
        dispatch(nameInput({type: "anime"}))
    }


    return (
        <div className={customClass}>
            {!sidebar && 
                <Link to={`moreInfo/${id}`}>
                    <img className="card-image" src={image} alt={title}/>
                </Link>
            }
            {sidebar &&
                <Link onClick={handleAnimeClick} to={`discovery/anime/moreInfo/${id}`}>
                    <img className="sideMenu-images" src={image} alt={title}/>
                </Link>
            }
            <div className="info">
                <h2 className="card-title">{title}</h2>
                {sidebar &&
                    <span>{`${firstTag || ""}, ${secondTag || ""}, ${thirdTag || ""}`}</span>
                }
            </div>
        </div>
    )
}