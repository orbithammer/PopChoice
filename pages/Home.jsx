import React from "react"
import { useNavigate } from "react-router-dom"
import OpenAI from "openai"
// import { ResponseContext } from "/index"
import { useOutletContext } from "react-router-dom"

export default function Home() {
    const [favoriteInput, setFavoriteInput] = React.useState("Alien because it's still scary no matter how many times I watch it.")
    const [recentnessInput, setRecentnessInput] = React.useState("I want to watch something made before 2022.")
    const [moodInput, setMoodInput] = React.useState("I want something fun.")
    const [isLooking, setIsLooking] = React.useState(false)
    // const [response, setResponse] = React.useState("default response")
    // const [imdbId, setImbdId] = React.useState("")
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const {recommendation, setRecommendation} = useOutletContext()
    const imdbIdRegex = new RegExp("tt[0-9]+")

    const navigate = useNavigate()
    
    const handleFavoriteChange = event => {
        setFavoriteInput(event.target.value)
    }
    const handleRecentnessChange = event => {
        setRecentnessInput(event.target.value)
    }
    const handleMoodChange = event => {
        setMoodInput(event.target.value)
    }

    async function fetchMovieInfo(imdbId) {
        const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&type=movie&apikey=1d92d023`)
        const data = await res.json()
        console.log("data",data)
        const { Title, Year, Poster, Plot} = await data
        console.log(Title, Year, Poster, Plot)
        setRecommendation({
            title: Title,
            year: Year,
            poster: Poster,
            plot: Plot
        })
        console.log("home recommendation state", recommendation)
    }

    async function fetchRecommendation(favoriteInput, recentnessInput, moodInput) {
        setIsLooking(true)
        const input = `FAVORITE:${favoriteInput} RECENTNESS:${recentnessInput} MOOD:${moodInput}`
        
        console.log("fetching")
        try{
            const messages = [
                {
                    role: "system",
                    content: "You are a movie expert. You will be given 3 pieces of info: the user's favorite move, the time period they would like to watch a movie from, and the mood of the movie. Depending on the input, you recommend a rare, independent, or underrated movie that the user might not have heard of. Your response will be the IMDB ID only. Do not recommend the same movie as the user's favorite movie."
                },
                {
                    role: "user",
                    content: input
                }
            ]
            
            const openai = new OpenAI({
                apiKey,
                dangerouslyAllowBrowser: true
            })

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                temperature: 0
            })
            // console.log(response.choices[0].message.content)
            const rawResponse = response.choices[0].message.content
            console.log("rawResponse", rawResponse)
            const imdbId = rawResponse.match(imdbIdRegex)[0]
            console.log("imdbId", imdbId)
            // setImbdId(rawImbdId)
            // console.log("imbdId",imdbId)
            await fetchMovieInfo(imdbId)
            setIsLooking(false)
            navigate("/recommendation")
        } catch(err) {
            console.log("Error: ", err)
            setIsLooking(false)
        }
    }
    return (
        <div className="app-screen">
            <h2>What's your favorite movie and why?</h2>
            <textarea 
                value={favoriteInput} 
                name="favorite"
                onChange={handleFavoriteChange} 
                placeholder="The Shawshank Redemption because it taught me to never give up hope no matter how hard life gets" />
            <h2>Are you in the mood for something new or a classic?</h2>
            <textarea 
                value={recentnessInput} 
                name="recentness"
                onChange={handleRecentnessChange} 
                placeholder="I want to watch movies that were released after 1990" />
            <h2>Do you wanna have fun or do you want something serious?</h2>
            <textarea 
                value={moodInput} 
                name="mood"
                onChange={handleMoodChange} 
                placeholder="I want to watch something stupid and fun" />
            <button 
                onClick={()=>fetchRecommendation(favoriteInput, recentnessInput, moodInput)}>
                    {isLooking ? "Getting movie..." : "Get movie"}
            </button>
        </div>
    )
}
