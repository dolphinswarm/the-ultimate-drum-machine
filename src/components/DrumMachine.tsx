import React from 'react'
import Track from './Track'
import * as Tone from 'tone'

// type DrumMachineProps = {play: void};

const DrumMachine = () => {

    // ==============================
    // STATE MANAGEMENT
    // ==============================   
    const [beatNum, setBeatNum] = React.useState(0);
    const [players, setPlayers] = React.useState({});
    const [sortOrder, setSortOrder] = React.useState(1);
    const [bpm, setBpm] = React.useState(120);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const initialState = {
        inUseTracks: [],
        availableTracks: [
            {
                displayName: "Kick",
                instrumentLocation: "/sample/kick-1.wav",
            },
            {
                displayName: "Snare",
                instrumentLocation: "/sample/snare-1.wav"
            },
            {
                displayName: "Hi-Hat",
                instrumentLocation: "/sample/hihat-1.wav"
            },
            {
                displayName: "Cat",
                instrumentLocation: "/sample/meow-1.wav"
            },
        ],
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ToggleBeat':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.updatedTrack.displayName), 
                        action.payload.updatedTrack].sort((a,b) => a.id - b.id)
                };
            case 'AddTrack':
                return {
                    inUseTracks: [...state.inUseTracks, action.payload.newTrack].sort((a,b) => a.id - b.id),
                    availableTracks: [...state.availableTracks.filter(_ => _.displayName !== action.payload.newTrack.displayName)]
                };
            case 'SwitchInstuments':
                return {
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.oldTrack.displayName), action.payload.newTrack].sort((a,b) => a.id - b.id),
                    availableTracks: [...state.availableTracks.filter(_ => _.displayName !== action.payload.newTrack.displayName), action.payload.oldTrack],
                };
            case 'DeleteTrack':
                return {
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.track.displayName)],
                    availableTracks: [...state.availableTracks, action.payload.track]
                };
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const playersRef = React.useRef(players);
    playersRef.current = players;
    const beatRef = React.useRef(beatNum);
    beatRef.current = beatNum;
    const stateRef = React.useRef(state);
    stateRef.current = state;

    // ==============================
    // DRUM MACHINE FUNCTIONS
    // ==============================

    /**
     * Turns a beat on or off.
     */
    const toggleBeat = (trackName: string, beatCount: number) => {
        // Get the old track
        const updatedTrack = state.inUseTracks.filter((track) => track.displayName === trackName)[0];
        const prev = updatedTrack.beats[beatCount];
        updatedTrack.beats[beatCount] = !prev;

        dispatch({type: 'ToggleBeat', payload: {updatedTrack}})
    }

    /**
     * Adds a track to the list of tracks.
     */
    const addTrack = (): void => {
        // Get the first available track, if any
        const availableTrack = state.availableTracks[0];

        // Make a new track
        const newTrack = {
            ...availableTrack,
            id: sortOrder,
            beats: new Array(16).fill(false),
        }

        // Increment the sort order
        setSortOrder(sortOrder + 1);

        // Add the track to the state
        dispatch({type: 'AddTrack', payload: { newTrack }});
    }

    /**
     * Deletes a track from the list of tracks.
     */
     const deleteTrack = (trackName: string): void => {
        // Get the track
        const track = state.inUseTracks.filter((track) => track.displayName === trackName)[0];

        // Add the track to the state
        dispatch({type: 'DeleteTrack', payload: { track }});
    }

    /**
     * Updates a currently-existing track.
     */
    const switchInstruments = (oldInstrumentName: string, newInstrumentName: string): void => {
        // Get the old and new tracks
        const oldTrack = state.inUseTracks.filter((track) => track.displayName === oldInstrumentName)[0];
        const newTrack = state.availableTracks.filter((track) => track.displayName === newInstrumentName)[0];

        // Set the track beats and sort number
        newTrack.beats = oldTrack.beats;
        newTrack.id = oldTrack.id;
        oldTrack.beats = new Array(16).fill(false);
        oldTrack.id = null;

        // Add the track to the state
        dispatch({type: 'SwitchInstuments', payload: { oldTrack, newTrack }});
    }

    /**
     * UseEffect hook for playing the audio.
     */
    React.useEffect(() => {

        // Define the repeat measure
        const repeat = (time) => {
            // Get the state
            const currentState = stateRef.current;

            // For each in use track...
            currentState.inUseTracks.forEach((track) => {
                // Get the current beat number and track
                const sound = playersRef.current[track.displayName];
                const beat = beatRef.current;

                // Check if we have a beat. if so, play it
                if (track.beats[beat]) {
                    // players[index].triggerAttackRelease('C4', '16n', time);
                    sound?.start(time); 
                }
            })

            // Set the current beat number
            setBeatNum(step => { return step > 14 ? 0 : step + 1; });
        }

        // Schedule the song
        Tone.Transport.scheduleRepeat(repeat, '16n');
        
    }, []);
    
    /**
     * UseEffect hook for changing the song's BPM.
     */
    React.useEffect(() => { Tone.Transport.bpm.value = bpm; }, [bpm]);

    /**
     * UseEffect hook to begin or stop Tone.JS when the isPlaying state is toggled.
     */
    React.useEffect(() => {
        // If the context is suspended, start it
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        // Play / Pause the contexts
        if (isPlaying) {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
            setBeatNum(0);
        }
    }, [isPlaying]);

    return (
        <div id="drum-machine">
            {/* Button Container */}
            <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Play'}</button>

            {/* BPM Setter */}
            <input type="number" onChange={(event) => setBpm(parseFloat(event.target.value))} value={bpm} />

            {/* Track Container */}
            <div id="track-container">
                {state.inUseTracks.map((track, index) =>
                    <Track
                        key={index}
                        trackName={track.displayName}
                        instrumentLocation={track.instrumentLocation}
                        currentBeat={beatNum}
                        toggleBeat={(beatCount) => toggleBeat(track.displayName, beatCount)}
                        switchInstruments={switchInstruments}
                        deleteTrack={deleteTrack}
                        beats={track.beats}
                        state={state}
                        setPlayers={setPlayers}
                        isPlaying={isPlaying} />)}
            </div>

            {/* Add Track */}
            <button onClick={addTrack} disabled={state.availableTracks.length <= 0}>Add Track</button>
        </div>
    )
}

export default DrumMachine

// {/* Track Container */}
// <div id="track-container">
//     <Track trackName={"Kick"} toggleBeat={(beatCount) => toggleBeat("kick", beatCount)} beats={state.kick.beats}/>
//     <Track trackName={"Snare"} toggleBeat={(beatCount) => toggleBeat("snare", beatCount)} beats={state.snare.beats}/>
//     <Track trackName={"Hi-Hat"} toggleBeat={(beatCount) => toggleBeat("hihat", beatCount)} beats={state.hihat.beats}/>
// </div>