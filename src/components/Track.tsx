import React from 'react'
import Beat from './Beat'
import * as Tone from 'tone'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Draggable } from 'react-beautiful-dnd';

type TrackProps = {
    index: number,
    trackName: string,
    instrumentLocation: string,
    category: string,
    currentBeat: number,
    deleteTrack: (trackName: string)=>void,
    toggleBeat: (beatCount: number)=>void,
    changeTrackVolume: (trackName: string, volume: number)=>void,
    switchInstruments: any // FIX ME!! TODO
    beats: Array<number>,
    state: any,
    playersRef: any, // FIX ME TODO
    isPlaying: boolean // FIX ME!! TODO
};

const Track = ({index, trackName, instrumentLocation, category, currentBeat, deleteTrack, toggleBeat, changeTrackVolume, switchInstruments, beats, state, playersRef, isPlaying} : TrackProps) => {

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

    const getImageSource = (): string => {
        switch (category) {
            case "kick":
                return "img/kick.png";
            case "snare":
            case "tom":
                return "img/snare.png";
            case "hihat":
                return "img/hihat.png";
            case "ride":
            case "crash":
                return "img/crash.png";
            case "clap":
                return "img/clap.png";
            case "fx":
                return "img/fx.png";
            case "accessory":
                return "img/accessory.png";
            default:
                return "MEOW";
        }
    }

    return (
        <Draggable draggableId={trackName} index={index}>
            {(provided) => (
            <div className={`track track-${category}`}
                ref={provided.innerRef}
                {...provided.draggableProps} >

                {/* Icon */}
                <div className="track-drag" {...provided.dragHandleProps}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
                
                {/* Icon */}
                <div className="track-icon">
                    <img src={getImageSource()} className="instrument-icon" alt="track-icon" />
                </div>

                {/* Track Controls and Info */}
                <div className="track-controls">
                    {/* Track Title */}
                    <div className="track-title">
                        <span className="title-maintext">{trackName}</span>&nbsp;
                        <span className="title-subtext">({category})</span>
                    </div>

                    {/* Dropdown For Track */}
                    <div className="track-control-section">
                    <label htmlFor={`${trackName}-instrumentchange`}>Current Instrument:</label><br />
                    <select
                        value={trackName}
                        name={`${trackName}-instrumentchange`}
                        onChange={(event) => switchInstruments(trackName, event.target.value)}>

                        {allTracks.map((track, index) =>
                            <option
                                key={index}
                                value={track.displayName}
                                disabled={disableSelectionOfTrack(track)}>
                            {track.displayName}
                            </option>)}
                    </select>
                    </div>

                    {/* Volume Slider */}
                    <div className="track-control-section">
                    <label htmlFor={`${trackName}-volume`}>Volume:</label><br />
                    <input
                        type="range"
                        min="-20" max="20" step="0.1"
                        value={playersRef.current[trackName].volume.value}
                        name={`${trackName}-volume`}
                        onChange={(event) => changeTrackVolume(trackName, Math.round(parseFloat(event.target.value) * 10) / 10) } />
                    </div>

                    {/* Delete Track */}
                    <button onClick={() => deleteTrack(trackName)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>

                <div className="track-beats">
                {beats.map((isEnabled, beatCount) => 
                    <Beat
                        key={beatCount}
                        beatCount={beatCount}
                        currentBeat={currentBeat}
                        beatState={isEnabled}
                        toggleBeat={toggleBeat}
                        isPlaying={isPlaying} />)}
                </div>
            </div>)}
        </Draggable>
    )
}

export default Track
