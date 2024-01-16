import React from "react"
import { 
    useOutletContext,
    NavLink
} from "react-router-dom"


export default function Recommendation() {
    const {recommendation} = useOutletContext()
    const {title, year, poster, plot, imdbId} = recommendation
    return (
        <>
            <div className="app-screen">
                <h2>{title} ({year})</h2>
                <a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer">
                    <img src={poster} alt={`${title} movie poster`} />
                </a>
                <p>{plot}</p>
                <NavLink className="go-again-button" to="/">Go Again</NavLink>
            </div>
        </>
    )
}
