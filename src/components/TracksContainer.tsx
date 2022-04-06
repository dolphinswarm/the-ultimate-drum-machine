import React from "react";
import { DrumMachineState, InstrumentCategory } from "../Types";
import Track from "./Track";
import { Droppable } from "react-beautiful-dnd";

type TracksContainerProps = {
    addTrack: (category: InstrumentCategory) => void;
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
    addTrack,
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
        ...state.inUseTracks.map((_) => ({
            trackName: _.displayName,
            category: _.category,
            inUse: true,
        })),
        ...state.availableTracks.map((_) => ({
            trackName: _.displayName,
            category: _.category,
            inUse: false,
        })),
    ];

    // Get a list of all categories and their availability
    const allCategories: InstrumentCategory[] = [
        "kick",
        "snare",
        "hihat",
        "clap",
        "fx",
        "crash",
        "ride",
        "tom",
        "accessory",
    ];
    const categories: {
        name: InstrumentCategory;
        anyAvailableTracks: boolean;
    }[] = allCategories.map((_) => ({
        name: _,
        anyAvailableTracks: state.availableTracks.some((i) => i.category === _),
    }));

    const trackCategoryRef = React.useRef<HTMLSelectElement>(null);

    const anyAvailableCategoriesLeft = categories.some(
        (_) => _.anyAvailableTracks
    );
    const firstAvailableCategory = anyAvailableCategoriesLeft
        ? categories.filter((_) => _.anyAvailableTracks)[0].name
        : null;

    const [selectedCategory, setSelectedCategory] =
        React.useState<InstrumentCategory | null>(() => firstAvailableCategory);

    const doesCategoryHaveAnyAvailable = categories.filter(
        (_) => _.name === selectedCategory
    )[0].anyAvailableTracks;

    React.useEffect(() => {
        if (anyAvailableCategoriesLeft && !doesCategoryHaveAnyAvailable) {
            setSelectedCategory(firstAvailableCategory);
        }
    }, [
        anyAvailableCategoriesLeft,
        categories,
        doesCategoryHaveAnyAvailable,
        firstAvailableCategory,
        selectedCategory,
    ]);

    return (
        <>
            {/* Add Track */}
            {firstAvailableCategory ? (
                <>
                    <select
                        className="capitalize"
                        ref={trackCategoryRef}
                        onChange={(event) =>
                            setSelectedCategory(
                                event.target.value as InstrumentCategory
                            )
                        }
                        value={selectedCategory!}
                    >
                        {categories.map((category, index) => (
                            <option
                                className="capitalize"
                                key={index}
                                value={category.name}
                                disabled={!category.anyAvailableTracks}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() =>
                            addTrack(
                                trackCategoryRef.current
                                    ?.value as InstrumentCategory
                            )
                        }
                        disabled={state.availableTracks.length <= 0}
                    >
                        Add Track
                    </button>
                </>
            ) : null}

            {/* Track Container */}
            <div id="track-container">
                {state.inUseTracks.length === 0 ? (
                    <p id="start-label">
                        You can start making beats by selecting a track category
                        then clicking "Add Track" above!
                    </p>
                ) : null}
                <Droppable droppableId="drum-machine-tracks">
                    {(provided) => (
                        <div
                            id="track-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {state.inUseTracks.map((track, index) => (
                                <Track
                                    key={track.displayName}
                                    index={index}
                                    track={track}
                                    tracksInCategory={allTracks
                                        .filter(
                                            (_) => _.category === track.category
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
                                        toggleBeat(track.displayName, beatCount)
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
