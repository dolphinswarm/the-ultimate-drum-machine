import React from 'react'

const HeaderContainer = ({isPlaying} : {isPlaying: boolean}) => {
    return (
        <div className="machine-header">
            <div className="woofer-container">
                <img src="img/speaker-left.jpg" className={`woofer ${isPlaying ? "woofer-animated" : ""}`} />
            </div>
            <h1 className="machine-title">The Ultimate Drum Machine</h1>
            <div className="woofer-container">
                <img src="img/speaker-right.jpg" className={`woofer ${isPlaying ? "woofer-animated" : ""}`} />
            </div>
        </div>
    )
}

export default HeaderContainer
