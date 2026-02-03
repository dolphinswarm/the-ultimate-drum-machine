import React from "react";
import Beat from "./Beat";
import { faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import { AvailableTrack, DrumMachineState, InUseTrack } from "../Types";

type TrackProps = {
    index: number;
    track: InUseTrack;
    tracksInCategory: { trackName: string; inUse: boolean }[];
    currentBeat: number;
    playersRef: React.MutableRefObject<{}>;
    isPlaying: boolean;
    switchInstruments: (
        originalInstrumentName: string,
        newInstrumentName: string
    ) => void;
    changeTrackVolume: (trackName: string, volume: number) => void;
    deleteTrack: (trackName: string) => void;
    toggleBeat: (beatCount: number) => void;
};

const Track = ({
    index,
    track,
    tracksInCategory,
    currentBeat,
    playersRef,
    isPlaying,
    switchInstruments,
    changeTrackVolume,
    deleteTrack,
    toggleBeat,
}: TrackProps) => {
    const publicUrl = process.env.PUBLIC_URL || "";

    /**
     * Gets the source of an image, given its category
     * @returns The local source of an image, as a string
     */
    const getImageSource = (): string => {
        switch (track.category) {
            case "kick":
                return `${publicUrl}/img/kick.png`;
            case "snare":
            case "tom":
                return `${publicUrl}/img/snare.png`;
            case "hihat":
                return `${publicUrl}/img/hihat.png`;
            case "ride":
            case "crash":
                return `${publicUrl}/img/crash.png`;
            case "clap":
                return `${publicUrl}/img/clap.png`;
            case "fx":
                return `${publicUrl}/img/fx.png`;
            case "accessory":
                return `${publicUrl}/img/accessory.png`;
            default:
                return `${publicUrl}/img/accessory.png`;
        }
    };

    return (
        <Draggable draggableId={track.displayName} index={index}>
            {(provided) => (
                <div
                    className={`track track-${track.category}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {/* Icon */}
                    <div className="track-drag" {...provided.dragHandleProps}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </div>

                    {/* Icon */}
                    <div className="track-icon">
                        <img
                            src={getImageSource()}
                            className="instrument-icon"
                            alt="track-icon"
                        />
                    </div>

                    {/* Track Controls and Info */}
                    <div className="track-controls">
                        {/* Track Title */}
                        <div className="track-title">
                            <span className="title-maintext">
                                {track.displayName}
                            </span>
                            &nbsp;
                            <span className="title-subtext">
                                ({track.category})
                            </span>
                        </div>

                        {/* Dropdown For Track */}
                        <div className="track-control-section">
                            <label
                                htmlFor={`${track.displayName}-instrumentchange`}
                            >
                                Select Instrument:
                            </label>
                            <br />
                            <select
                                value={track.displayName}
                                name={`${track.displayName}-instrumentchange`}
                                onChange={(event) =>
                                    switchInstruments(
                                        track.displayName,
                                        event.target.value
                                    )
                                }
                            >
                                {/* Loop through all the tracks in the catgory */}
                                {tracksInCategory.map(
                                    (categoryTrack, index) => (
                                        <option
                                            key={index + 1}
                                            value={categoryTrack.trackName}
                                            disabled={
                                                categoryTrack.inUse &&
                                                categoryTrack.trackName !==
                                                    track.displayName
                                            }
                                        >
                                            {categoryTrack.trackName}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Volume Slider */}
                        <div className="track-control-section">
                            <label htmlFor={`${track.displayName}-volume`}>
                                Volume:
                            </label>
                            <br />
                            <input
                                type="range"
                                min="-20"
                                max="20"
                                step="0.1"
                                value={
                                    playersRef.current[track.displayName].volume
                                        .value
                                }
                                name={`${track.displayName}-volume`}
                                onChange={(event) =>
                                    changeTrackVolume(
                                        track.displayName,
                                        Math.round(
                                            parseFloat(event.target.value) * 10
                                        ) / 10
                                    )
                                }
                            />
                        </div>

                        {/* Delete Track */}
                        <button onClick={() => deleteTrack(track.displayName)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>

                    <div className="track-beats">
                        {track.beats.map((isEnabled, beatCount) => (
                            <Beat
                                key={beatCount}
                                beatCount={beatCount}
                                currentBeat={currentBeat}
                                beatState={isEnabled}
                                toggleBeat={toggleBeat}
                                isPlaying={isPlaying}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Track;
