import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ControlProps = {
    toggleIsPlaying: ()=>void,
    isPlaying: boolean,
    changeBpm: (val: string)=>void,
    bpm: number
};

const ControlsContainer = ({toggleIsPlaying, isPlaying, changeBpm, bpm} : ControlProps) => {
    return (
        <div id="controls-container">
            {/* Button Container */}
            <button onClick={() => toggleIsPlaying()}>
                <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
            </button>

            {/* BPM Setter */}
            <input type="number" onChange={(event) => changeBpm(event.target.value)} value={bpm} />
        </div>
    )
}

export default ControlsContainer
