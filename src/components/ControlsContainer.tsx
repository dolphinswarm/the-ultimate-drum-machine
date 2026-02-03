import React from "react";
import { faPlay, faStop, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInputButton from "./FileInputButton";
import FileExportButton from "./FileExportButton";
import { DrumMachineState, InstrumentCategory } from "../Types";

type ControlProps = {
    toggleIsPlaying: () => void;
    isPlaying: boolean;
    changeBpm: (val: string) => void;
    bpm: number;
    state: DrumMachineState;
    readToStateFromJSONFile: (state: DrumMachineState) => void;
    addTrack: (category: InstrumentCategory) => void;
};

const ControlsContainer = ({
    toggleIsPlaying,
    isPlaying,
    changeBpm,
    bpm,
    state,
    readToStateFromJSONFile,
    addTrack,
}: ControlProps) => {
    const [localBPM, setLocalBPM] = React.useState(bpm.toString() ?? "");
    const invalidChars = ["-", "+", "e"];

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
    }[] = allCategories.map((category) => ({
        name: category,
        anyAvailableTracks: Object.values(state.availableTracks).some(
            (track) => track.category === category
        ),
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

    const doesCategoryHaveAnyAvailable = selectedCategory
        ? categories.filter((_) => _.name === selectedCategory)[0]
              .anyAvailableTracks
        : false;

    const changeLocalBPM = (bpm: string) => {
        setLocalBPM(bpm);
    };

    React.useEffect(() => {
        changeLocalBPM(bpm.toString());
    }, [bpm]);

    return (
        <div id="controls-container">
            {/* Play / Stop */}
            <div className="controls-group">
                <button onClick={() => toggleIsPlaying()}>
                    <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
                </button>
            </div>

            {/* BPM */}
            <div className="controls-group">
                <label className="controls-label" htmlFor="bpm-input">
                    BPM
                </label>
                <input
                    id="bpm-input"
                    type="number"
                    min="30"
                    max="240"
                    onBlur={() => changeBpm(localBPM)}
                    onChange={(event) => changeLocalBPM(event.target.value)}
                    onKeyDown={(event) => {
                        if (invalidChars.includes(event.key))
                            event.preventDefault();
                    }}
                    value={localBPM}
                />
            </div>

            {/* Add Track */}
            <div className="controls-group">
                <label className="controls-label" htmlFor="add-track-select">
                    Add track
                </label>
                <select
                    id="add-track-select"
                    className="capitalize"
                    ref={trackCategoryRef}
                    onChange={(event) =>
                        setSelectedCategory(
                            event.target.value as InstrumentCategory
                        )
                    }
                    value={selectedCategory ?? undefined}
                    disabled={!firstAvailableCategory}
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
                    disabled={
                        !firstAvailableCategory ||
                        Object.values(state.availableTracks).length <= 0 ||
                        !doesCategoryHaveAnyAvailable
                    }
                >
                    <FontAwesomeIcon icon={faPlus} /> Add
                </button>
            </div>

            {/* Import / Export */}
            <div className="controls-group controls-group--end">
                <FileInputButton
                    readToStateFromJSONFile={readToStateFromJSONFile}
                />
                <FileExportButton state={state} />
            </div>
        </div>
    );
};

export default ControlsContainer;
