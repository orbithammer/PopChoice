import React from "react"
import {ResponseContext} from "/index"

export default function Recommendation() {
    const value = React.useContext(ResponseContext)
    // console.log(value)
    return (
        <>
            <h2>Recommendation goes here</h2>
        </>
    )
}
