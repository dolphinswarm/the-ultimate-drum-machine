import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ControlProps = {
    toggleIsPlaying: ()=>void,
    isPlaying: boolean,
    changeBpm: (val: string)=>void,
    bpm: number,
    effects: any,
    changeEffect: (effect: string, value: number)=>void,
};

const ControlsContainer = ({toggleIsPlaying, isPlaying, changeBpm, bpm, effects, changeEffect} : ControlProps) => {

    const [localBPM, setLocalBPM] = React.useState(bpm.toString());
    const invalidChars = [ "-", "+", "e" ];

    const changeLocalBPM = (bpm: string) => {; setLocalBPM(bpm); }

    const x = effects;

    React.useEffect(() => {
        changeLocalBPM(bpm.toString());
    }, [bpm])

    return (
        <div id="controls-container">
            {/* Button Container */}
            <button onClick={() => toggleIsPlaying()}>
                <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
            </button>

            {/* BPM Setter */}
            <input type="number" min="30" max="240"
                onBlur={() => changeBpm(localBPM) }
                onChange={(event) => changeLocalBPM(event.target.value)}
                onKeyDown={(event) => { if (invalidChars.includes(event.key)) event.preventDefault(); }}
                value={localBPM}/>

            {/* Reverb Slider */}
            <div className="track-control-section">
            <label htmlFor="reverb">Reverb:</label><br />
            <input
                type="range"
                min="-60" max="6" step="0.1"
                value={effects["reverb"]?.volume.value ?? -60}
                name="reverb"
                onChange={(event) => changeEffect("reverb", parseFloat(event.target.value)) } />
            </div>

            {/* Reverb Slider */}
            <div className="track-control-section">
            <label htmlFor="chorus">Chorus:</label><br />
            <input
                type="range"
                min="-60" max="6" step="0.1"
                value={effects["chorus"]?.volume.value ?? -60}
                name="chorus"
                onChange={(event) => changeEffect("chorus", parseFloat(event.target.value)) } />
            </div>

            {/* Reverb Slider */}
            <div className="track-control-section">
            <label htmlFor="distortion">Distortion:</label><br />
            <input
                type="range"
                min="-60" max="6" step="0.1"
                value={effects["distortion"]?.volume.value ?? -60}
                name="distortion"
                onChange={(event) => changeEffect("distortion", parseFloat(event.target.value)) } />
            </div>
        </div>
    )
}

export default ControlsContainer
