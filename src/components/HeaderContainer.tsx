import React from 'react'

const HeaderContainer = ({isPlaying} : {isPlaying: boolean}) => {
    const publicUrl = process.env.PUBLIC_URL || "";

    return (
        <div className="machine-header">
            <div className="woofer-container">
                <img src={`${publicUrl}/img/speaker-left.jpg`} className={`woofer ${isPlaying ? "woofer-animated" : ""}`} alt="left speaker" />
            </div>
            <h1 className="machine-title">The Ultimate Drum Machine</h1>
            <div className="woofer-container">
                <img src={`${publicUrl}/img/speaker-right.jpg`} className={`woofer ${isPlaying ? "woofer-animated" : ""}`} alt="right speaker" />
            </div>
        </div>
    )
}

export default HeaderContainer
