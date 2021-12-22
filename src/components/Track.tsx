import React from 'react'
import Beat from './Beat'
import * as Tone from 'tone'

type TrackProps = {
    trackName: string,
    instrumentLocation: string,
    category: string,
    currentBeat: number,
    deleteTrack: (trackName: string)=>void,
    toggleBeat: (beatCount: number)=>void,
    switchInstruments: any // FIX ME!! TODO
    beats: Array<boolean>,
    state: any,
    playersRef: any, // FIX ME TODO
    isPlaying: boolean // FIX ME!! TODO
};

const Track = ({trackName, instrumentLocation, category, currentBeat, deleteTrack, toggleBeat, switchInstruments, beats, state, playersRef, isPlaying} : TrackProps) => {

    const disableSelectionOfTrack = (track): boolean => {
        // If this is the current track, don't disable
        if (track.displayName === trackName)
            return false;

        // If this track isn't selected, don't disable
        const names = state.availableTracks.map((track) => track.displayName);
        if (names.includes(track.displayName))
            return false;

        return true;
    }

    let allTracks = [...state.inUseTracks, ...state.availableTracks].sort((a, b) => {
        return a.displayName.localeCompare(b.displayName);
    });

    allTracks = allTracks.filter((track) => track.category === category);
    
    const [volume, setVolume] = React.useState(0);
    React.useEffect(() => {
        playersRef.current[trackName].volume.value = volume;
    }, [volume]);

    return (
        <div className="track">
            {/* Track Title */}
            <h3>{trackName}</h3>

            <div className="track-controls">
                {/* Dropdown For Track */}
                <select value={trackName} onChange={(event) => switchInstruments(trackName, event.target.value)}>
                    {allTracks.map((track, index) =>
                        <option
                            key={index}
                            value={track.displayName}
                            disabled={disableSelectionOfTrack(track)}>
                        {track.displayName}
                        </option>)}
                </select>

                {/* Volume Slider */}
                <input type="range" min="-20" max="20" value={volume} step="0.1" onChange={(event) => setVolume(Math.round(parseFloat(event.target.value) * 10) / 10) } />

                {/* Delete Track */}
                <button onClick={() => deleteTrack(trackName)}>Delete Track</button>

            </div>

            {beats.map((isEnabled, beatCount) => 
                <Beat
                    key={beatCount}
                    beatCount={beatCount}
                    currentBeat={currentBeat}
                    isEnabled={isEnabled}
                    toggleBeat={toggleBeat}
                    isPlaying={isPlaying} />)}
        </div>
    )
}

export default Track
