import { useState } from "react"
import OpenAI from "openai"

export default function Home() {
    const [favoriteInput, setFavoriteInput] = useState("Alien because it's still scary no matter how many times I watch it.")
    const [recentnessInput, setRecentnessInput] = useState("I want to watch something made before 1990.")
    const [moodInput, setMoodInput] = useState("I want something fun.")
    const [isLooking, setIsLooking] = useState(false)
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    
    const handleFavoriteChange = event => {
        setFavoriteInput(event.target.value)
    }
    const handleRecentnessChange = event => {
        setRecentnessInput(event.target.value)
    }
    const handleMoodChange = event => {
        setMoodInput(event.target.value)
    }

    async function fetchRecommendation(favoriteInput, recentnessInput, moodInput) {
        setIsLooking(true)
        const input = `FAVORITE:${favoriteInput}  RECENTNESS:${recentnessInput}  MOOD:${moodInput}`
        console.log(input)
        try{
            const messages = [
                {
                    role: "system",
                    content: "You are a movie expert. You will be given 3 pieces of info: the user's favorite move, the time period they would like to watch a movie from, and the mood of the movie. Depending on the input, you recommend movies to the user and tell a description of the recommendation. End your response with the IMDB ID number. Limit your response to 30 words."
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
                temperature: 1.1
            })
            console.log(response.choices[0].message.content)
            setIsLooking(false)
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
                onChange={handleFavoriteChange} 
                placeholder="The Shawshank Redemption because it taught me to never give up hope no matter how hard life gets" />
            <h2>Are you in the mood for something new or a classic?</h2>
            <textarea 
                value={recentnessInput} 
                onChange={handleRecentnessChange} 
                placeholder="I want to watch movies that were released after 1990" />
            <h2>Do you wanna have fun or do you want something serious?</h2>
            <textarea 
                value={moodInput} 
                onChange={handleMoodChange} 
                placeholder="I want to watch something stupid and fun" />
            <button 
                onClick={()=>fetchRecommendation(favoriteInput, recentnessInput, moodInput)}>
                    {isLooking ? "Getting movie..." : "Get movie"}
            </button>
        </div>
    )
}
