import React from "react"
import { Outlet } from "react-router-dom"
import Header from "/components/Header"

export default function Layout() {
    // const [response, setResponse] = React.useState("default response")
    const [recommendation, setRecommendation] = React.useState({})
    console.log("recommendation state layout", recommendation)
    return (
        <>
            <Header />
            <Outlet context={{recommendation, setRecommendation}}/> 
        </>
    )
}