import React from "react"
import { useNavigate } from "react-router-dom"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js";
// import { ResponseContext } from "/index"
import { useOutletContext } from "react-router-dom"

export default function Home() {
    const [favoriteInput, setFavoriteInput] = React.useState("")
    // const [recentnessInput, setRecentnessInput] = React.useState("I want to watch something made in the 70s.")
    const [moodInput, setMoodInput] = React.useState("")
    const [isTimeNew, setIsTimeNew] = React.useState(true)
    console.log("isTimeNew", isTimeNew)
    const [isLooking, setIsLooking] = React.useState(false)
    // const [response, setResponse] = React.useState("default response")
    // const [imdbId, setImbdId] = React.useState("")
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY
    const {recommendation, setRecommendation} = useOutletContext()
    const imdbIdRegex = new RegExp("tt[0-9]+")

    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    })
    const supabase = createClient(supabaseUrl, supabaseApiKey)

    const navigate = useNavigate()
    
    const handleFavoriteChange = event => {
        setFavoriteInput(event.target.value)
    }
    // const handleRecentnessChange = event => {
    //     setRecentnessInput(event.target.value)
    // }
    const handleMoodChange = event => {
        setMoodInput(event.target.value)
    }

    // function toggleTimeNowButton(bool) {
    //     setIsTimeNow(bool)
    // }

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

    async function fetchRecommendation(favoriteInput, moodInput) {
        setIsLooking(true)
        // const favoriteMovieImdbId = fetchFavoriteMovie(favoriteInput)
        const input = `FAVORITE:${favoriteInput} MOOD:${moodInput}`
        console.log("fetching")
        if(isTimeNew) {
            main(input)

            async function main(input) {
                const embedding = await createEmbedding(input);
                const rawMatch = await findNearestMatch(embedding);
                console.log("main rawMatch: ", rawMatch)
                const imdbId = rawMatch.match(imdbIdRegex)[0]
                console.log("imdbId",imdbId)
                // await getChatCompletion(match, input);
                await fetchMovieInfo(imdbId)
                setIsLooking(false)
                navigate("/recommendation")
              }
              
              // Create an embedding vector representing the query
              async function createEmbedding(input) {
                const embeddingResponse = await openai.embeddings.create({
                  model: "text-embedding-ada-002",
                  input
                });
                return embeddingResponse.data[0].embedding;
              }
              
              // Query Supabase and return a semantically matching text chunk
              async function findNearestMatch(embedding) {
                const { data } = await supabase.rpc('match_moviesimdb', {
                  query_embedding: embedding,
                  match_threshold: 0.50,
                  match_count: 1
                });
                console.log("data: ",data)
                return data[0].content;
              }
              
            

              // Use OpenAI to make the response conversational
            //   const chatMessages = [{
            //       role: 'system',
            //       content: `You are a movie expert. You will be given 2 pieces of info: the user's favorite move and the mood of the movie. Depending on the input, you recommend a movie. Your response will be the IMDB ID only. Do not recommend the movie in FAVORITE:. Limit your response to the 9 characters of the IMBD ID only.` 
            //   }]
              
            // async function getChatCompletion(text, query) {
            //     chatMessages.push({
            //       role: 'user',
            //       content: `Context: ${text} Question: ${query}`
            //     });
                
            //     const response = await openai.chat.completions.create({
            //       model: 'gpt-3.5-turbo',
            //       messages: chatMessages,
            //       temperature: 1,
            //       frequency_penalty: 0.5
            //     });
            //     console.log(response.choices[0].message.content);
            //   }
            // async function main(input) {
            //     console.log("main input", input)
            //     const embedding = await createEmbedding(input)
            //     const match = await findNearestMatch(embedding)
            //     console.log("main match: ", match)
            //     await getChatCompletion(match, input)
            // }

            // async function createEmbedding(text) {
            //     console.log("text: ", text)
            //     const embeddingResponse = await openai.embeddings.create({
            //       model: "text-embedding-ada-002",
            //       input
            //     });
            //     // console.log("embeddingResponse: ", embeddingResponse.data[0].embedding)
            //     return embeddingResponse.data[0].embedding;
            // }

            // // Query Supabase and return a semantically matching text chunk
            // async function findNearestMatch(embedding) {
            //     const { data } = await supabase.rpc('match_moviesImdb', {
            //     query_embedding: embedding,
            //     match_threshold: 0.50,
            //     match_count: 1
            //     });
            //     // const match = data.map(movie=>movie.content).join("\n")
            //     // console.log("match: ", match)
            //     console.log("findNearestMatch data: ", data)
            //     return match
            // //   return data[0].content;
            // }

            // // Use OpenAI to make the response conversational
            // const chatMessages = [{
            //     role: 'system',
            //     content: `You are a movie expert. You will be given 2 pieces of info: the user's favorite move and the mood of the movie. Depending on the input, you recommend a movie. Your response will be the IMDB ID only. Do not recommend the movie in FAVORITE:. Limit your response to the 9 characters of the IMBD ID only.`
            // }];

            // async function getChatCompletion(input) {
            //     console.log("getChatCompletion input", input)
            //     chatMessages.push({
            //         role: "user",
            //         context: input
            //     })
            // }

            // const response = await openai.chat.completions.create({
            //     model: 'gpt-3.5-turbo',
            //     messages: chatMessages,
            //     temperature: 0.5,
            //     frequency_penalty: 0.5
            // });
            // console.log("response", response.choices[0].message.content);
        } else {
                try{
                    const messages = [
                        {
                            role: "system",
                            content: `You are a movie expert. You will be given 2 pieces of info: the user's favorite move and the mood of the movie. Depending on the input, you recommend a rare, independent, international, or underrated movie that the user might not have heard of. Your response will be the IMDB ID only. Do not recommend the movie in FAVORITE:. Limit your response to the 9 characters of the IMBD ID only.`
                        },
                        {
                            role: "user",
                            content: input
                        }
                    ]
                    
                    // const openai = new OpenAI({
                    //     apiKey,
                    //     dangerouslyAllowBrowser: true
                    // })
        
                    const response = await openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages,
                        temperature: 1
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
            <div className="button-wrapper">
                <button className={ isTimeNew ? "button-selected" : "button-not-selected" } onClick={()=>setIsTimeNew(true)}>New</button>
                <button className={ isTimeNew ? "button-not-selected" : "button-selected" } onClick={()=>setIsTimeNew(false)}>Classic</button>
            </div>
            <h2>What kind of movie do you wanna watch?</h2>
            <textarea 
                value={moodInput} 
                name="mood"
                onChange={handleMoodChange} 
                placeholder="I want to watch something fun/serious/child friendly, etc." />
            <button 
                className="get-movie-button"
                onClick={()=>fetchRecommendation(favoriteInput, moodInput)}>
                    {isLooking ? "Getting movie..." : "Get movie"}
            </button>
        </div>
    )
}


/* <textarea 
                value={recentnessInput} 
                name="recentness"
                onChange={handleRecentnessChange} 
                placeholder="I want to watch movies that were released after 1990" /> */