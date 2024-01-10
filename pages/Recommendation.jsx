import React from "react"
// import {ResponseContext} from "/index"
import { 
    useOutletContext,
    NavLink
} from "react-router-dom"


export default function Recommendation() {
    // const value = React.useContext(ResponseContext)
    // console.log(value)
    const {recommendation} = useOutletContext()
    console.log("rec recommendation", recommendation)
    const {title, year, poster, plot} = recommendation
    console.log("rec", title, year, poster, plot)
    // const imdbIdRegex = new RegExp("tt[0-9]+")
    // const bracketsRegex = new RegExp("\(\)\[\]\{\}")
    // const imdbId = response.match(imdbIdRegex)[0]
    // console.log("imdbId",imdbId)
    // const title = imdbId
    // const movieDescription = response.replace("IMDB ID:", "")
    // const navigate = useNavigate()

    // const {title: data.title} = 
    // async function fetchMovie(imdbId) {
    //     const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&type=movie&apikey=1d92d023`)
    //     const data = await res.json()
    //     return data.Title
    // }
    // console.log(fetchMovie(imdbId))
    // function goAgain() {
    //     navigate("/")
    //     }
    
    return (
        <>
            <div className="app-screen">
                <h2>{title} ({year})</h2>
                <img src={poster} alt={`${title} movie poster`} />
                <p>{plot}</p>
                <NavLink to="/">Go Again</NavLink>
            </div>
        </>
    )
}
