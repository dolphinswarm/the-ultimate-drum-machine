import React from 'react'

type BeatProps = { beatCount: number; currentBeat: number, toggleBeat: (beatCount: number)=>void; isEnabled: boolean, isPlaying: boolean };

const Beat = ({beatCount, currentBeat, toggleBeat, isEnabled, isPlaying} : BeatProps) => {

    return (
        <div className='beat'
            style={{'backgroundColor': isPlaying && currentBeat === beatCount ? 'blue' : isEnabled ? 'green' : 'gray'}}
            onDoubleClick={() => toggleBeat(beatCount)}>
        </div>
    )
}

export default Beat
