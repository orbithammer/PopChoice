import React from "react"
import { Outlet } from "react-router-dom"
import Header from "/components/Header"

export default function Layout() {
    const [response, setResponse] = React.useState("default response")
    console.log("response state layout", response)
    return (
        <>
            <Header />
            <Outlet context={{response, setResponse}}/> 
        </>
    )
}