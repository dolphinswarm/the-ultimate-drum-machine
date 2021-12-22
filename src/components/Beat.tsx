import React from 'react'

type BeatProps = { beatCount: number; currentBeat: number, toggleBeat: (beatCount: number)=>void; isEnabled: boolean, isPlaying: boolean };

const Beat = ({beatCount, currentBeat, toggleBeat, isEnabled, isPlaying} : BeatProps) => {

    const backgroundColor = () => {
        if (isPlaying && currentBeat === beatCount) return 'blue';
        else
        {
            if (beatCount % 4 === 0) {
                return isEnabled ? 'darkgreen' : 'gray';
            }
            else {
                return isEnabled ? 'green' : 'darkgray';
            }
        }
    }

    return (
        <div className='beat'
            style={{'backgroundColor': backgroundColor()}}
            onDoubleClick={() => toggleBeat(beatCount)}>
        </div>
    )
}

export default Beat
