import React from 'react';

const FileInputButton = ({readToStateFromJSONFile} : {readToStateFromJSONFile: (state: object)=>void }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const importState = (event) => {
        // Create a file
        const file = event.target.files[0];
        const fileName = file.name;

        // Check if the extension is .txt
        const extension = fileName.split(".").pop();
        const isSupported = ["txt"].includes(extension);
        if (!isSupported)
        {
            alert("Invalid file format. Please only submit .txt files!");
            return;
        }

        // If so, read in the file
        const fileReader = new FileReader();

        // Read in the .txt file
        fileReader.readAsText(file, "UTF-8");

        try {
            fileReader.onload = e => {
                const result = e.target?.result;
                readToStateFromJSONFile(JSON.parse(result as string));
            }
        }
        catch (exception) {
            alert("Something went wrong parsing the .txt file!")
        }
    }

    return (
        <div>
            <button onClick={() => fileInputRef.current!.click()}>Import</button>
            <input ref={fileInputRef} type="file" style={{display: "none"}} accept="text/plain" onChange={importState} />
        </div>
    );
};

export default FileInputButton;
