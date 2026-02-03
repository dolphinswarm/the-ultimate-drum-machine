import React from "react";
import { DrumMachineState } from "../Types";
import Track from "./Track";
import { Droppable } from "react-beautiful-dnd";

type TracksContainerProps = {
    state: DrumMachineState;
    currentBeat: number;
    playersRef: React.MutableRefObject<{}>;
    isPlaying: boolean;
    switchInstruments: (
        originalInstrumentName: string,
        newInstrumentName: string
    ) => void;
    changeTrackVolume: (trackName: string, volume: number) => void;
    deleteTrack: (trackName: string) => void;
    toggleBeat: (trackName: string, beatCount: number) => void;
};

const TracksContainer = ({
    state,
    currentBeat,
    playersRef,
    isPlaying,
    switchInstruments,
    changeTrackVolume,
    deleteTrack,
    toggleBeat,
}: TracksContainerProps) => {
    // Make a reduced list of all the tracks
    const allTracks = [
        ...Object.values(state.inUseTracks).map((_) => ({
            trackName: _.displayName,
            category: _.category,
            inUse: true,
        })),
        ...Object.values(state.availableTracks).map((_) => ({
            trackName: _.displayName,
            category: _.category,
            inUse: false,
        })),
    ];

    return (
        <>
            {/* Track Container */}
            <div id="track-container">
                {Object.values(state.inUseTracks).length === 0 ? (
                    <p id="start-label">
                        You can start making beats by selecting a track category
                        then clicking "Add" in the controls above!
                    </p>
                ) : null}
                <Droppable droppableId="drum-machine-tracks">
                    {(provided) => (
                        <div
                            id="track-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {Object.values(state.inUseTracks)
                                .sort((a, b) =>
                                    a.sortOrder > b.sortOrder ? 1 : -1
                                )
                                .map((track, index) => (
                                    <Track
                                        key={track.displayName}
                                        index={index}
                                        track={track}
                                        tracksInCategory={allTracks
                                            .filter(
                                                (_) =>
                                                    _.category ===
                                                    track.category
                                            )
                                            .map((_) => ({
                                                trackName: _.trackName,
                                                inUse: _.inUse,
                                            }))
                                            .sort((a, b) =>
                                                a.trackName.localeCompare(
                                                    b.trackName
                                                )
                                            )}
                                        currentBeat={currentBeat}
                                        playersRef={playersRef}
                                        isPlaying={isPlaying}
                                        switchInstruments={switchInstruments}
                                        changeTrackVolume={changeTrackVolume}
                                        deleteTrack={deleteTrack}
                                        toggleBeat={(beatCount) =>
                                            toggleBeat(
                                                track.displayName,
                                                beatCount
                                            )
                                        }
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    );
};

export default TracksContainer;
