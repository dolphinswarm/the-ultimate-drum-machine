import React from "react";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DrumMachineState } from "../Types";

const FileExportButton = ({ state }: { state: DrumMachineState }) => {
    const exportState = () => {
        // Create a new file
        const file = new Blob([JSON.stringify(state)], { type: "text/plain" });

        // Create a new element and append it to the document, then download
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "beat.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <button type="button" onClick={exportState}>
            <FontAwesomeIcon icon={faFileExport} /> Export
        </button>
    );
};

export default FileExportButton;
