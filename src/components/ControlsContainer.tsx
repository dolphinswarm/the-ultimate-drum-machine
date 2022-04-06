import React from "react";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInputButton from "./FileInputButton";
import FileExportButton from "./FileExportButton";
import { DrumMachineState } from "../Types";

type ControlProps = {
    toggleIsPlaying: () => void;
    isPlaying: boolean;
    changeBpm: (val: string) => void;
    bpm: number;
    state: DrumMachineState;
    readToStateFromJSONFile: (state: DrumMachineState) => void;
};

const ControlsContainer = ({
    toggleIsPlaying,
    isPlaying,
    changeBpm,
    bpm,
    state,
    readToStateFromJSONFile,
}: ControlProps) => {
    const [localBPM, setLocalBPM] = React.useState(bpm.toString() ?? "");
    const invalidChars = ["-", "+", "e"];

    const changeLocalBPM = (bpm: string) => {
        setLocalBPM(bpm);
    };

    React.useEffect(() => {
        changeLocalBPM(bpm.toString());
    }, [bpm]);

    return (
        <div id="controls-container">
            {/* Button Container */}
            <button onClick={() => toggleIsPlaying()}>
                <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
            </button>

            {/* BPM Setter */}
            <input
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

            {/* Import / Export State */}
            <FileInputButton
                readToStateFromJSONFile={readToStateFromJSONFile}
            />
            <FileExportButton state={state} />
        </div>
    );
};

export default ControlsContainer;
