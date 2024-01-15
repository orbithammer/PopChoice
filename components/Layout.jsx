import React from "react"
import { Outlet } from "react-router-dom"
import Header from "/components/Header"

export default function Layout() {
    const [recommendation, setRecommendation] = React.useState({})
    return (
        <>
            <Header />
            <Outlet context={{recommendation, setRecommendation}}/> 
        </>
    )
}