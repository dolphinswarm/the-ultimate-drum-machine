import React from 'react';

const FileExportButton = ({state} : {state: any}) => {
    const exportState = () => {
        // Create a new file
        const file = new Blob([JSON.stringify(state)], {type: 'text/plain'});

        // Create a new element and append it to the document, then download
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "beat.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    
    return (<button onClick={exportState}>Export</button>);
};

export default FileExportButton;
