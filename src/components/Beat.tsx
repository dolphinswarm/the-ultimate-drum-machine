import React from 'react'

type BeatProps = {
    beatCount: number;
    currentBeat: number,
    toggleBeat: (beatCount: number)=>void;
    beatState: number,
    isPlaying: boolean
};

const Beat = ({beatCount, currentBeat, toggleBeat, beatState, isPlaying} : BeatProps) => {

    const backgroundColor = () => {
        if (isPlaying && currentBeat === beatCount) return 'blue';
        else
        {
            if (beatCount % 4 === 0) {
                return beatState > 0 ?
                    (beatState === 1 ? 'darkgreen' : 'darkgoldenrod') :
                    'gray';
            }
            else {
                return beatState > 0 ?
                    (beatState === 1 ? 'green' : 'goldenrod') :
                    'darkgray';
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
