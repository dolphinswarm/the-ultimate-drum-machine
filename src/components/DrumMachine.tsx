import React from 'react'
import Track from './Track'
import * as Tone from 'tone'
import ControlsContainer from './ControlsContainer';
import HeaderContainer from './HeaderContainer';
import { DragDropContext, Droppable, DropResult, } from 'react-beautiful-dnd';

// type DrumMachineProps = {play: void};

const DrumMachine = () => {

    // ==============================
    // STATE MANAGEMENT
    // ==============================   
    const [beatNum, setBeatNum] = React.useState(0);
    const [players, setPlayers] = React.useState({});
    const [effects, setEffects] = React.useState({});
    const [sortOrder, setSortOrder] = React.useState(1);
    const [bpm, setBpm] = React.useState(120);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const initialState = {
        inUseTracks: [],
        availableTracks: [
            // ================ KICKS
            {
                displayName: "Heavy Trap Kick",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-1.wav",
            },
            {
                displayName: "Acoustic Kick #1",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-2.wav",
            },
            {
                displayName: "Acoustic Kick #2",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-6.wav",
            },
            {
                displayName: "Light Trap Kick",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-3.wav",
            },
            {
                displayName: "Boom Kick",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-7.wav",
            },
            {
                displayName: "Hip-Hop Vinyl Kick",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-5.wav",
            },
            {
                displayName: "8-Bit Kick",
                category: "kick",
                instrumentLocation: "/sample/kick/kick-4.wav",
            },
            // ================ SNARES
            {
                displayName: "Acoustic Snare #1",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-1.wav",
            },
            {
                displayName: "Acoustic Snare #2",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-2.wav",
            },
            {
                displayName: "Acoustic Snare #3",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-7.wav",
            },
            {
                displayName: "Hip-Hop Snare",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-3.wav",
            },
            {
                displayName: "Trap Snare #1",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-4.wav",
            },
            {
                displayName: "Trap Snare #2",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-5.wav",
            },
            {
                displayName: "Trap Snare #3",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-6.wav",
            },
            {
                displayName: "8-Bit Snare",
                category: "snare",
                instrumentLocation: "/sample/snare/snare-8.wav",
            },
            // ================ HI-HATS
            {
                displayName: "Acoustic Closed Hi-Hat #1",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-1.wav",
            },
            {
                displayName: "Acoustic Closed Hi-Hat #2",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-6.wav",
            },
            {
                displayName: "Trap Closed Hi-Hat #1",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-2.wav",
            },
            {
                displayName: "Trap Closed Hi-Hat #2",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-3.wav",
            },
            {
                displayName: "Trap Closed Hi-Hat #3",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-4.wav",
            },
            {
                displayName: "Trap Closed Hi-Hat #4",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-closed-5.wav",
            },
            {
                displayName: "Acoustic Open Hi-Hat",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-open-5.wav",
            },
            {
                displayName: "Trap Open Hi-Hat #1",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-open-2.wav",
            },
            {
                displayName: "Trap Open Hi-Hat #2",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-open-3.wav",
            },
            {
                displayName: "Trap Open Hi-Hat #3",
                category: "hihat",
                instrumentLocation: "/sample/hihat/hihat-open-4.wav",
            },
            // ================ CLAPS
            {
                displayName: "Clap #1",
                category: "clap",
                instrumentLocation: "/sample/clap/clap-1.wav",
            },
            {
                displayName: "Clap #2",
                category: "clap",
                instrumentLocation: "/sample/clap/clap-2.wav",
            },
            {
                displayName: "Clap #3",
                category: "clap",
                instrumentLocation: "/sample/clap/clap-3.wav",
            },
            {
                displayName: "Clap #4",
                category: "clap",
                instrumentLocation: "/sample/clap/clap-4.wav",
            },
            {
                displayName: "Clap #5",
                category: "clap",
                instrumentLocation: "/sample/clap/clap-5.wav",
            },
            // ================ FX
            {
                displayName: "Cat",
                category: "fx",
                instrumentLocation: "/sample/fx/meow-1.wav",
            },
            {
                displayName: "Hey!",
                category: "fx",
                instrumentLocation: "/sample/fx/hey-1.wav",
            },
            {
                displayName: "Laser",
                category: "fx",
                instrumentLocation: "/sample/fx/laser-1.wav",
            },
            {
                displayName: "Orchestra Hit",
                category: "fx",
                instrumentLocation: "/sample/fx/orchestra-hit-1.wav",
            },
            {
                displayName: "Record Scratch",
                category: "fx",
                instrumentLocation: "/sample/fx/record-scratch-1.wav",
            },
            {
                displayName: "Telephone",
                category: "fx",
                instrumentLocation: "/sample/fx/telephone-1.wav",
            },
            {
                displayName: "Yeah!",
                category: "fx",
                instrumentLocation: "/sample/fx/yeah-1.wav",
            },
            // ================ CRASHES
            {
                displayName: "Acoustic Crash Cymbal",
                category: "crash",
                instrumentLocation: "/sample/crash/crash-1.wav",
            },
            {
                displayName: "Orchestral Crash Cymbal",
                category: "crash",
                instrumentLocation: "/sample/crash/crash-2.wav",
            },
            {
                displayName: "Hip-Hop Crash Cymbal",
                category: "crash",
                instrumentLocation: "/sample/crash/crash-3.wav",
            },
            // ================ RIDES
            {
                displayName: "Acoustic Ride Cymbal",
                category: "ride",
                instrumentLocation: "/sample/ride/ride-1.wav",
            },
            {
                displayName: "Hip-Hop Ride Cymbal #1",
                category: "ride",
                instrumentLocation: "/sample/ride/ride-2.wav",
            },
            {
                displayName: "Hip-Hop Ride Cymbal #2",
                category: "ride",
                instrumentLocation: "/sample/ride/ride-3.wav",
            },
            // ================ TOMS
            {
                displayName: "Acoustic Tom (Low)",
                category: "tom",
                instrumentLocation: "/sample/tom/tom-low-1.wav",
            },
            {
                displayName: "Synth Tom (Low)",
                category: "tom",
                instrumentLocation: "/sample/tom/tom-synth-1.wav",
            },
            {
                displayName: "Hip-Hop Tom (Low)",
                category: "tom",
                instrumentLocation: "/sample/tom/tom-synth-2.wav",
            },
            {
                displayName: "Hip-Hop Tom (Middle)",
                category: "tom",
                instrumentLocation: "/sample/tom/tom-synth-3.wav",
            },
            {
                displayName: "Hip-Hop Tom (High)",
                category: "tom",
                instrumentLocation: "/sample/tom/tom-synth-4.wav",
            },
            // ================ ACCESSORIES
            {
                displayName: "Cowbell",
                category: "accessory",
                instrumentLocation: "/sample/accessories/cowbell-1.wav",
            },
            {
                displayName: "Bongo (Hi)",
                category: "accessory",
                instrumentLocation: "/sample/accessories/bongo-hi-1.wav",
            },
            {
                displayName: "Bongo (Lo)",
                category: "accessory",
                instrumentLocation: "/sample/accessories/bongo-lo-1.wav",
            },
            {
                displayName: "Shaker #1",
                category: "accessory",
                instrumentLocation: "/sample/accessories/shaker-1.wav",
            },
            {
                displayName: "Shaker #2",
                category: "accessory",
                instrumentLocation: "/sample/accessories/shaker-2.wav",
            },
            {
                displayName: "Shaker #3",
                category: "accessory",
                instrumentLocation: "/sample/accessories/shaker-3.wav",
            },
            {
                displayName: "Shaker #4",
                category: "accessory",
                instrumentLocation: "/sample/accessories/shaker-4.wav",
            },
            {
                displayName: "Tambourine",
                category: "accessory",
                instrumentLocation: "/sample/accessories/tambourine-1.wav",
            },
            {
                displayName: "Triangle",
                category: "accessory",
                instrumentLocation: "/sample/accessories/triangle-1.wav",
            },
            {
                displayName: "Click",
                category: "accessory",
                instrumentLocation: "/sample/accessories/click-1.wav",
            },
            {
                displayName: "Clave",
                category: "accessory",
                instrumentLocation: "/sample/accessories/clave-1.wav",
            },
        ],
        effects: [
            {
                id: 1,
                displayName: "Reverb",
                volume: -60
            },
            {
                id: 2,
                displayName: "Distortion",
                volume: -60
            },
            {
                id: 3,
                displayName: "Chorus",
                volume: -60
            },
        ],
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ReorderInUseTracks':
                return {
                    ...state,
                    inUseTracks: action.payload
                };
            case 'ChangeTrackVolume':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.updatedTrack.displayName), 
                        action.payload.updatedTrack].sort((a,b) => a.id - b.id)
                };
            case 'ChangeEffectVolume':
                return {
                    ...state,
                    effects: [...state.effects.filter(_ => _.displayName !== action.payload.updatedEffect.displayName), 
                        action.payload.updatedEffect].sort((a,b) => a.id - b.id)
                };
            case 'ToggleBeat':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.updatedTrack.displayName), 
                        action.payload.updatedTrack].sort((a,b) => a.id - b.id)
                };
            case 'AddTrack':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks, action.payload.newTrack].sort((a,b) => a.id - b.id),
                    availableTracks: [...state.availableTracks.filter(_ => _.displayName !== action.payload.newTrack.displayName)]
                };
            case 'SwitchInstuments':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.oldTrack.displayName), action.payload.newTrack].sort((a,b) => a.id - b.id),
                    availableTracks: [...state.availableTracks.filter(_ => _.displayName !== action.payload.newTrack.displayName), action.payload.oldTrack],
                };
            case 'DeleteTrack':
                return {
                    ...state,
                    inUseTracks: [...state.inUseTracks.filter(_ => _.displayName !== action.payload.track.displayName)],
                    availableTracks: [...state.availableTracks, action.payload.track]
                };
            case 'ImportStateFromJSON':
                return {
                    inUseTracks: action.payload.inUseTracks,
                    availableTracks: action.payload.availableTracks,
                    effects: action.payload.effects,
                };
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const playersRef = React.useRef(players);
    playersRef.current = players;
    const effectsRef = React.useRef(effects);
    effectsRef.current = effects;
    const beatRef = React.useRef(beatNum);
    beatRef.current = beatNum;
    const stateRef = React.useRef(state);
    stateRef.current = state;

    const trackCategoryRef = React.useRef<any>(null);

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
        switch (prev)
        {
            case 0:
                updatedTrack.beats[beatCount] = prev + 1;
                break;
            case 1:
                updatedTrack.category === "hihat" ?
                    updatedTrack.beats[beatCount] = prev + 1 :
                    updatedTrack.beats[beatCount] = 0;
                break;
            case 2:
                updatedTrack.beats[beatCount] = 0;
                break;
        }

        dispatch({type: 'ToggleBeat', payload: {updatedTrack}})
    }

    /**
     * Change the volume of a track
     */
    const changeTrackVolume = (trackName: string, volume: number) => {
        // Get the old track
        const updatedTrack = state.inUseTracks.filter((track) => track.displayName === trackName)[0];

        // Change the volume to the new volume
        updatedTrack.volume = volume;

        // Update the state
        dispatch({type: 'ChangeTrackVolume', payload: {updatedTrack}})
    }

    /**
     * Change the volume of a track
     */
    const changeEffectVolume = (effectName: string, volume: number) => {
        // Get the old track
        const updatedEffect = state.effects.filter((track) => track.displayName === effectName)[0];

        // Change the volume to the new volume
        updatedEffect.volume = volume;

        // Update the state
        dispatch({type: 'ChangeEffectVolume', payload: {updatedEffect}})
    }

    /**
     * Toggle play / stop of the machine.
     */
    const toggleIsPlaying = () => { setIsPlaying(!isPlaying); }

    /**
     * Change the BPM.
     */
    const changeBpm = (bpm: string) => {
        let bpmNum = 120;
        if (bpm) {
            bpmNum = parseFloat(bpm);
            if (bpmNum < 30) bpmNum = 30;
            if (bpmNum > 240) bpmNum = 240;
        }
            
        setBpm(bpmNum);
    }

    const readToStateFromJSONFile = (state: object) => {
        // Update the state
        dispatch({type: 'ImportStateFromJSON', payload: state})
    }

    /**
     * Change the track volume.
     */
    // const changeTrackVolume = (trackName: string, value: number) => {
    //     // Set the volume of the track
    //     playersRef.current[trackName].volume.value = value;
    // }

    /**
     * Adds a track to the list of tracks.
     */
    const addTrack = (): void => {
        // Get the first available track of a selected category, if any
        const category = trackCategoryRef.current.value;
        const availableTrack = state.availableTracks.filter((item) => item.category === category)[0];

        // Make a new track
        const newTrack = {
            ...availableTrack,
            id: sortOrder,
            volume: 0,
            beats: new Array(16).fill(0),
        }

        // Increment the sort order
        setSortOrder(sortOrder + 1);

        // Create a new track
        const player = new Tone.Player(newTrack.instrumentLocation).toDestination();
        const playerChannel = new Tone.Channel().toDestination();
		playerChannel.send("chorus");
		playerChannel.send("distortion");
		playerChannel.send("reverb");
		player.connect(playerChannel);
        
        setPlayers(players => ({
            ...players,
            [availableTrack.displayName]: player,
        }));

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
        oldTrack.beats = new Array(16).fill(0);
        oldTrack.id = null;

        // Create a new track
        const player = new Tone.Player(newTrack.instrumentLocation).toDestination();
        const playerChannel = new Tone.Channel().toDestination();
		playerChannel.send("chorus");
		playerChannel.send("distortion");
		playerChannel.send("reverb");
		player.connect(playerChannel);
        
        setPlayers(players => ({
            ...players,
            [newInstrumentName]: player,
        }));

        // Add the track to the state
        dispatch({type: 'SwitchInstuments', payload: { oldTrack, newTrack }});
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        
        // If no destination, stop running
        if (!destination || destination.index === source.index) return;

        const tracks = state.inUseTracks;
        const [removed] = tracks.splice(source.index, 1);
        tracks.splice(destination.index, 0, removed);

        tracks.forEach((track, index) => {
            track.id = index + 1;
        });

        dispatch({type: 'ReorderInUseTracks', payload: tracks });
    };

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
                    // sound?.start(time);

                    // NORMAL BEAT
                    if (track.beats[beat] === 1)
                    {
                        sound?.start(time);
                    }
                    // ROLL
                    else if (track.beats[beat] === 2 && track.category === "hihat")
                    {
                        sound?.start();
                        sound?.start('+64n');
                        sound?.start('+32n');
                    }
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
     * UseEffect hook for changing the song's effects on load.
     */
    React.useEffect(() => {
        // Create a new chorus effect
        const chorus = new Tone.Chorus({
			wet: 1,
		}).toDestination().start();
		const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
		chorusChannel.receive("chorus");

        // Create new cheby effect
		const cheby = new Tone.Chebyshev(50).toDestination();
		const chebyChannel = new Tone.Channel({ volume: -60 }).connect(cheby);
		chebyChannel.receive("distortion");

        // Create new reverb channel
		const reverb = new Tone.Reverb(3).toDestination();
		const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
		reverbChannel.receive("reverb");

        // Add the channels to state
        setEffects(
            {
                "Chorus": chorusChannel,
                "Distortion": chebyChannel,
                "Reverb": reverbChannel,
            }
        );
    }, []);

    React.useEffect(() => {
        state.inUseTracks.forEach(item => {
            playersRef.current[item.displayName].volume.value = item.volume;
        });
        if (Object.keys(effectsRef.current).length !== 0)
        {
            state.effects.forEach(item => {
                effectsRef.current[item.displayName].volume.value = item.volume;
            });
        }    
    }, [state]);

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

    const availableCategories : string[] = Array.from(new Set(state.availableTracks.map(item => item.category)));
    const sortedCategories = availableCategories.sort();

    const isPlayingNoteCurrently = isPlaying && state.inUseTracks.filter(track => track.beats[beatNum]).length !== 0;

    // console.log(JSON.stringify(state));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div id="drum-machine">
            {/* Header */}
            <HeaderContainer isPlaying={isPlayingNoteCurrently} />

            {/* Controls */}
            <ControlsContainer
                toggleIsPlaying={toggleIsPlaying}
                isPlaying={isPlaying}
                changeBpm={changeBpm}
                bpm={bpm}
                state={state}
                effectsRef={effectsRef}
                changeEffectVolume={changeEffectVolume}
                readToStateFromJSONFile={readToStateFromJSONFile} />

            {/* Add Track */}
            <select className="capitalize" ref={trackCategoryRef}>
                {sortedCategories.map((item, index) =>
                    <option
                        className="capitalize"
                        key={index}
                        value={item}>
                    {item}
                    </option>)}
            </select>
            <button onClick={addTrack} disabled={state.availableTracks.length <= 0}>Add Track</button>

            {/* Track Container */}
            <div id="track-container">
                {state.inUseTracks.length === 0 ? <p id="start-label">You can start making beats by selecting a track category then clicking "Add Track" above!</p> : null}
                <Droppable droppableId="drum-machine-tracks">
                    {(provided) => (
                    <div id="track-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                    {state.inUseTracks.map((track, index) =>
                        <Track
                            key={track.displayName}
                            index={index}
                            trackName={track.displayName}
                            instrumentLocation={track.instrumentLocation}
                            category={track.category}
                            currentBeat={beatNum}
                            toggleBeat={(beatCount) => toggleBeat(track.displayName, beatCount)}
                            switchInstruments={switchInstruments}
                            deleteTrack={deleteTrack}
                            changeTrackVolume={changeTrackVolume}
                            beats={track.beats}
                            state={state}
                            playersRef={playersRef}
                            isPlaying={isPlaying} />)}
                    {provided.placeholder}
                    </div>)}
                </Droppable>
            </div>
        </div>
        </DragDropContext>
    )
}

export default DrumMachine