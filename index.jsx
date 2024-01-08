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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/recommendation" element={ <Recommendation /> } />
                </Route>
            </Routes>
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