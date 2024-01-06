import React from "react"
import iconUrl from "/images/PopChoiceIcon.svg"

export default function Header() {
    return (
        <header>
            <img src={iconUrl} alt="an anthropomorphic popcorn bucket" />
            <h1>PopChoice</h1>
        </header>
    )
}