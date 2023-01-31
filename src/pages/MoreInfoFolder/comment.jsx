import { useState } from "react"
import "./comment.scss"

export default function Comment ({data, review, score, user, image}) {

    const [expanded, setExpanded] = useState(false)
    const commentPreview = `${review.slice(0, 100)}...`

    return (
        <div className="comment-container">
            <p className="display-user-info">
                <img className="comment-image-styling" src={image} alt="profile picture of user doing review"/>
                {user} 
                <span 
                    className="date-of-comment">{new Date(data).toLocaleString()}
                </span>
            </p>
            <p className="actual-comment-container">{!expanded ? commentPreview : review}</p>
            <div className="comment-more-btn-cont">
                {!expanded && 
                    <button 
                        className="see-more-or-less-btn" 
                        onClick={() => setExpanded(true)}>See More...
                    </button>
                }
                {expanded && 
                    <button 
                        className="see-more-or-less-btn" 
                        onClick={() => setExpanded(false)}>See Less...
                    </button>
                }
            </div>
            <span>Score: {score}</span>
        </div>
    )
}