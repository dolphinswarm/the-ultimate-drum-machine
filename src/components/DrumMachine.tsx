import React from "react";
import * as Tone from "tone";
import ControlsContainer from "./ControlsContainer";
import HeaderContainer from "./HeaderContainer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getInitialState } from "../hooks/getInitialState";
import { actions, reducer } from "../state/DrumMachineState";
import {
    AvailableTrack,
    DrumMachineState,
    InstrumentCategory,
    InUseTrack,
    IToneTrack,
} from "../Types";
import TracksContainer from "./TracksContainer";
// import EffectsContainer from "./EffectsContainer";

// type DrumMachineProps = {play: void};

const DrumMachine = () => {
    // ==============================
    // STATE MANAGEMENT
    // ==============================
    const [beatNum, setBeatNum] = React.useState(0);
    const [players, setPlayers] = React.useState<IToneTrack>({});
    // const [effects, setEffects] = React.useState<IToneEffect>({});
    // const [playerChannels, setPlayerChannels] = React.useState({});
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [state, dispatch] = React.useReducer(reducer, getInitialState());

    const playersRef = React.useRef(players);
    playersRef.current = players;
    // const effectsRef = React.useRef(effects);
    // effectsRef.current = effects;
    // const playerChannelsRef = React.useRef(playerChannels);
    // playerChannelsRef.current = playerChannels;
    const beatRef = React.useRef(beatNum);
    beatRef.current = beatNum;
    const stateRef = React.useRef(state);
    stateRef.current = state;

    // const trackCategoryRef = React.useRef<InstrumentCategory>(null);

    // ==============================
    // DRUM MACHINE FUNCTIONS
    // ==============================
    const resolvePublicAssetUrl = (path: string): string => {
        const publicUrl = process.env.PUBLIC_URL || "";

        if (!path) return path;
        if (/^(https?:)?\/\//i.test(path)) return path;

        // If already rooted at PUBLIC_URL, don't double-prefix
        if (publicUrl && (path === publicUrl || path.startsWith(`${publicUrl}/`))) {
            return path;
        }

        // Public assets: `/img/...`, `/sample/...`, etc.
        if (path.startsWith("/")) return `${publicUrl}${path}`;

        return `${publicUrl}/${path}`;
    };

    /**
     * Toggles a beat on / off.
     * @param trackName The name of the track to change.
     * @param beatCount The beat to change.
     */
    const toggleBeat = (trackName: string, beatCount: number) => {
        // Get the old track
        const updatedTrack = { ...state.inUseTracks[trackName] };
        const prev = updatedTrack.beats[beatCount];

        const newBeats = [...updatedTrack.beats];
        // Toggle the beat type
        switch (prev) {
            case 0:
                newBeats[beatCount] = prev + 1;
                break;
            case 1:
                updatedTrack.category === "hihat"
                    ? (newBeats[beatCount] = prev + 1)
                    : (newBeats[beatCount] = 0);
                break;
            case 2:
                newBeats[beatCount] = 0;
                break;
        }
        updatedTrack.beats = newBeats;

        // Update the state
        dispatch(actions.toggleBeat(updatedTrack));
    };

    /**
     * Changes the volume of a track.
     * @param trackName The name of the track to change.
     * @param volume The new volume of the track.
     */
    const changeTrackVolume = (trackName: string, volume: number) => {
        // Update the state
        dispatch(actions.changeTrackVolume({ trackName, volume }));
    };

    /**
     * Changes the wet/dry of an effect send.
     * @param effectName The name of the desired effect.
     * @param paramName The name of the parameter to affect.
     * @param amount The new wet/dry of the effect.
     */
    // const changeEffectParam = (
    //     effectName: string,
    //     paramName: string,
    //     amount: number
    // ) => {
    //     // Update the state
    //     dispatch(actions.changeEffectParam({ effectName, paramName, amount }));
    // };

    /**
     * Toggle play / stop of the machine.
     */
    const toggleIsPlaying = () => {
        setIsPlaying(!isPlaying);
    };

    /**
     * Sets the BPM of the player.
     * @param bpm The desired BPM to be set, between 30 and 240 bpm.
     */
    const changeBpm = (bpm: string) => {
        let bpmNum = 120;
        if (bpm) {
            bpmNum = parseFloat(bpm);
            if (bpmNum < 30) bpmNum = 30;
            if (bpmNum > 240) bpmNum = 240;
        }

        // Update the bpm in state
        dispatch(actions.setBPM(bpmNum));
    };

    /**
     * Imports an exported JSON file into state.
     * @param state The state imported from JSON.
     */
    const readToStateFromJSONFile = (state: DrumMachineState) => {
        // For each in-use track, if a player doesn't exist, create it
        Object.keys(state.inUseTracks).forEach((track) => {
            if (!players[track]) {
                // Create a new track
                const player = new Tone.Player(
                    resolvePublicAssetUrl(
                        state.inUseTracks[track].instrumentLocation
                    )
                ).toDestination();

                // Add the players and player channels to state
                setPlayers((players) => ({
                    ...players,
                    [track]: player,
                }));
            }
        });

        // Update the state
        dispatch(actions.importStateFromJSON(state));
    };

    /**
     * Adds a track to the list of tracks.
     */
    const addTrack = (category: InstrumentCategory): void => {
        // Get the available tracks of a selected category
        const availableTracks = Object.values(state.availableTracks).filter(
            (_) => _.category === category
        );

        // If nothing in the array return to avoid throwing an error
        if (!availableTracks || !availableTracks.length) {
            return;
        }

        // Make a new track
        const availableTrack = availableTracks[0];
        const newTrack: InUseTrack = {
            ...availableTrack,
            volume: 0,
            beats: new Array(16).fill(0),
            sortOrder: Object.keys(state.inUseTracks).length + 1,
        };

        // Create a new track
        const player = new Tone.Player(
            resolvePublicAssetUrl(newTrack.instrumentLocation)
        ).toDestination();

        // Add the players and player channels to state
        setPlayers((players) => ({
            ...players,
            [availableTrack.displayName]: player,
        }));

        // Add the track to the state
        dispatch(actions.addTrack(newTrack));
    };

    /**
     * Adds an effect to the list of effect.
     */
    /* REMOVING THIS FOR NOW
    const addEffect = (effectName: string): void => {
        // Get the first available track of a selected category, if any
        const availableEffect = getAvailableEffectByName(effectName, state);

        // Make a new track
        const newEffect: InUseEffect = {
            ...availableEffect,
            volume: 0,
        };

        // Add the track to the state
        dispatch(actions.addEffect(newEffect));
    };
    */

    /**
     * Deletes a track from the drum machine.
     * @param trackName The name of the track to be deleted.
     */
    const deleteTrack = (trackName: string): void => {
        // Get the track
        const trackToDelete = state.inUseTracks[trackName];

        // Add the track to the state
        dispatch(actions.removeTrack(trackToDelete));
    };

    /**
     * Deletes an effect from the drum machine.
     * @param effectName The name of the effect to be deleted.
     */
    /* REMOVING THIS FOR NOW
    const deleteEffect = (effectName: string): void => {
        // Get the track
        const effectToDelete = getInUseEffectByName(effectName, state);

        // Add the track to the state
        dispatch(actions.removeEffect(effectToDelete));
    };
    */

    /**
     * Switches a track to a different instrument in the same category.
     * @param oldInstrumentName The name of the old instrument.
     * @param newInstrumentName The name of the instrument to switch to.
     */
    const switchInstruments = (
        originalInstrumentName: string,
        newInstrumentName: string
    ): void => {
        // Get the old and new tracks from state
        const originalTrack = state.inUseTracks[originalInstrumentName];

        const oldTrack: AvailableTrack = {
            ...originalTrack,
        };

        const newTrack: InUseTrack = {
            ...state.availableTracks[newInstrumentName],
            beats: originalTrack.beats,
            volume: originalTrack.volume,
            sortOrder: originalTrack.sortOrder,
        };

        // Create a new player for the track
        const player = new Tone.Player(
            resolvePublicAssetUrl(newTrack.instrumentLocation)
        ).toDestination();

        setPlayers((players) => ({
            ...players,
            [newInstrumentName]: player,
        }));

        // Add the track to the state
        dispatch(actions.switchInstuments({ oldTrack, newTrack }));
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // If no destination, stop running
        if (!destination || destination.index === source.index) return;

        // Make a copy of the tracks in state and splice it
        debugger;
        const tracks = [...Object.values(state.inUseTracks)];
        const [removed] = tracks.splice(source.index, 1);
        tracks.splice(destination.index, 0, removed);

        // Create a new array of tracks
        const newTracks = tracks.map((track, index) => ({
            ...track,
            sortOrder: index + 1,
        }));

        // Send the spliced track list to state
        dispatch(actions.reorderInUseTracks(newTracks));
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
            Object.values(currentState.inUseTracks).forEach((track) => {
                // Get the current beat number and track
                const sound = playersRef.current[track.displayName];
                const beat = beatRef.current;

                // Check if we have a beat. if so, play it
                if (track.beats[beat]) {
                    // players[index].triggerAttackRelease('C4', '16n', time);
                    // sound?.start(time);

                    // NORMAL BEAT
                    if (track.beats[beat] === 1) {
                        sound?.start(time);
                    }
                    // ROLL
                    else if (
                        track.beats[beat] === 2 &&
                        track.category === "hihat"
                    ) {
                        sound?.start();
                        sound?.start("+64n");
                        sound?.start("+32n");
                    }
                }
            });

            // Set the current beat number
            setBeatNum((step) => {
                return step > 14 ? 0 : step + 1;
            });
        };

        // Schedule the song
        Tone.Transport.scheduleRepeat(repeat, "16n");
    }, []);

    /**
     * Map the current effects to master whenever the list changes
     */
    // React.useEffect(() => {
    //     // Map all current player channels to this effect channel
    //     Tone.Destination.chain(...Object.values(effectsRef.current));
    // }, [state.inUseEffects]);

    /**
     * UseEffect hook for changing the song's BPM.
     */
    React.useEffect(() => {
        Tone.Transport.bpm.value = state.bpm;
    }, [state.bpm]);

    /**
     * UseEffect hook for adding the song's effects on load.
     */
    React.useEffect(() => {
        // // Create a new chorus effect
        // const chorus = new Tone.Chorus({
        //     wet: 1,
        // })
        //     .toDestination()
        //     .start();
        // const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
        // chorusChannel.receive("chorus");
        // // Create new cheby effect
        // const cheby = new Tone.Chebyshev(50).toDestination();
        // const chebyChannel = new Tone.Channel({ volume: -60 }).connect(cheby);
        // chebyChannel.receive("distortion");
        // // Create new reverb channel
        // const reverb = new Tone.Reverb(3).toDestination();
        // const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
        // reverbChannel.receive("reverb");
        // // Create new bitcrush channel
        // const bitcrush = new Tone.BitCrusher(4).toDestination();
        // const bitcrushChannel = new Tone.Channel({ volume: -60 }).connect(
        //     bitcrush
        // );
        // bitcrushChannel.receive("bitcrush");
        // const reverb = new Tone.Reverb(3).toDestination();
        // const lowpass = new Tone.Filter(800, "lowpass");
        // const highpass = new Tone.Filter(1500, "highpass");
        // setEffects({ Reverb: reverb, Lowpass: lowpass, Highpass: highpass });
        // // Add all the effects to the Master, in order
        // Tone.Destination.chain(...Object.values(effects));
    }, []);

    React.useEffect(() => {
        Object.keys(state.inUseTracks).forEach((trackName) => {
            const player = playersRef.current[trackName];
            if (typeof player !== "undefined")
                player.volume.value = state.inUseTracks[trackName].volume ?? 0;
        });
        // Object.keys(state.effects).forEach((effectName) => {
        //     const effect = effectsRef.current[effectName];
        //     if (typeof effect !== "undefined") {
        //         switch (effect.name) {
        //             case "Reverb":
        //                 debugger;
        //                 (effect as Tone.Reverb).decay =
        //                     state.effects["Reverb"]?.params.find(
        //                         (_) => _.name === "decay"
        //                     )?.amount ?? 0.001;
        //                 (effect as Tone.Reverb).wet.value =
        //                     state.effects["Reverb"]?.params.find(
        //                         (_) => _.name === "wet-dry"
        //                     )?.amount ?? 0.001;
        //         }
        //     }
        // });
        // state.effects.forEach((item) => {
        //     const effect = effectsRef.current[item.displayName];
        // });
    }, [
        state.inUseTracks,
        // state.effects
    ]);

    /**
     * UseEffect hook to begin or stop Tone.JS when the isPlaying state is toggled.
     */
    React.useEffect(() => {
        // If the context is suspended, start it
        if (Tone.context.state !== "running") {
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

    const isPlayingNoteCurrently =
        isPlaying &&
        Object.values(state.inUseTracks).filter((track) => track.beats[beatNum])
            .length !== 0;

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
                    bpm={state.bpm}
                    state={state}
                    readToStateFromJSONFile={readToStateFromJSONFile}
                    addTrack={addTrack}
                />

                {/* <EffectsContainer
                    state={state}
                    changeEffectParam={changeEffectParam}
                    currentBeat={beatNum}
                    isPlaying={isPlaying}
                /> */}

                <TracksContainer
                    state={state}
                    deleteTrack={deleteTrack}
                    switchInstruments={switchInstruments}
                    changeTrackVolume={changeTrackVolume}
                    toggleBeat={toggleBeat}
                    currentBeat={beatNum}
                    playersRef={playersRef}
                    isPlaying={isPlaying}
                />
            </div>
        </DragDropContext>
    );
};

export default DrumMachine;
