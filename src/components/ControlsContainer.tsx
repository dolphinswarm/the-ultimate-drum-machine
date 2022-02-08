import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileInputButton from './FileInputButton';
import FileExportButton from './FileExportButton';

type ControlProps = {
    toggleIsPlaying: ()=>void,
    isPlaying: boolean,
    changeBpm: (val: string)=>void,
    bpm: number,
    state: any,
    effectsRef: any,
    changeEffectVolume: (effect: string, value: number)=>void,
    readToStateFromJSONFile: (state: object)=>void
};

const ControlsContainer = ({toggleIsPlaying, isPlaying, changeBpm, bpm, state, effectsRef, changeEffectVolume, readToStateFromJSONFile} : ControlProps) => {

    const [localBPM, setLocalBPM] = React.useState(bpm.toString());
    const invalidChars = [ "-", "+", "e" ];

    const changeLocalBPM = (bpm: string) => {; setLocalBPM(bpm); }

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

            {/* Slider for each effect */}
            <div className="track-control-section">
            {state.effects.map((effect) => 
                <div key={effect.displayName}>
                    <label htmlFor={effect.displayName}>{`${effect.displayName}:`}</label><br />
                    <input
                        type="range"
                        min="-60" max="6" step="0.1"
                        value={effect.volume}
                        name={effect.displayName}
                        onChange={(event) => changeEffectVolume(effect.displayName, parseFloat(event.target.value)) } />
                </div>
            )}
            </div>


            {/* Import / Export State */}
            <FileInputButton readToStateFromJSONFile={readToStateFromJSONFile} />
            <FileExportButton state={state} />

        </div>
    )
}

export default ControlsContainer
