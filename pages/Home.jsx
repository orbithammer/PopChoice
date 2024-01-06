import { useState } from "react"

export default function Home() {
    const [favoriteInput, setFavoriteInput] = useState("")
    const [recentnessInput, setRecentnessInput] = useState("")
    const [moodInput, setMoodInput] = useState("")
    const handleFavoriteChange = event => {
        setFavoriteInput(event.target.value)
    }
    const handleRecentnessChange = event => {
        setRecentnessInput(event.target.value)
    }
    const handleMoodChange = event => {
        setMoodInput(event.target.value)
    }
    console.log(favoriteInput)
    return (
        <div className="app-screen">
            <h2>What's your favorite movie and why?</h2>
            <textarea value={favoriteInput} onChange={handleFavoriteChange} placeholder="favorite" />
            <h2>Are you in the mood for something
                new or a classic?</h2>
            <textarea value={recentnessInput} onChange={handleRecentnessChange} placeholder="recentness" />
            <h2>Do you wanna have fun or do you want something serious?</h2>
            <textarea value={moodInput} onChange={handleMoodChange} placeholder="mood" />
        </div>
    )
}
