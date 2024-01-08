import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes, 
    Route
} from "react-router-dom"
import Layout from "/components/Layout"
import Home from "/pages/Home"
import Recommendation from "/pages/Recommendation"

const ResponseContext = React.createContext()

function App() {
    const [response, setResponse] = React.useState("default response")
    const setResponseFromChild = (response) => {
        setResponse(response)
    }
    return (
        <BrowserRouter>
            <ResponseContext.Provider value={{response, setResponseFromChild}}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/recommendation" element={ <Recommendation /> } />
                    </Route>
                </Routes>
            </ResponseContext.Provider>
        </BrowserRouter>
        
    )
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )

export { ResponseContext }