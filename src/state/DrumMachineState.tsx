import { AvailableTrack, DrumMachineState, Effect, InUseTrack } from "../Types";
import {
    ActionFromReducer,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { getInitialState } from "../hooks/getInitialState";
import { convertArrayToRecord } from "../utils/DataStructureUtils";

const initialState: DrumMachineState = getInitialState();

export const drumMachineStateSlice = createSlice({
    name: "DrumMachineState",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Add a new track to the machine
        addTrack: (state, action: PayloadAction<InUseTrack>) => {
            state.inUseTracks[action.payload.displayName] = action.payload;
            delete state.availableTracks[action.payload.displayName];
        },
        // Remove an existing track from the machine
        removeTrack: (state, action: PayloadAction<InUseTrack>) => {
            state.availableTracks[action.payload.displayName] = action.payload;
            delete state.inUseTracks[action.payload.displayName];
        },
        // Toggle a beat on / off
        // (this is handled by the function)
        toggleBeat: (state, action: PayloadAction<InUseTrack>) => {
            state.inUseTracks[action.payload.displayName] = action.payload;
        },
        // Reorder / sort the tracks
        // (this is handled by the function)
        reorderInUseTracks: (state, action: PayloadAction<InUseTrack[]>) => {
            state.inUseTracks = convertArrayToRecord(
                action.payload,
                "displayName"
            );
        },
        // Change the volume of a track
        changeTrackVolume: (
            state,
            action: PayloadAction<{ trackName: string; volume: number }>
        ) => {
            // state.inUseTracks = state.inUseTracks.map((track) => {
            //     return track.displayName === action.payload.trackName
            //         ? { ...track, volume: action.payload.volume }
            //         : track;
            // });
            state.inUseTracks[action.payload.trackName].volume =
                action.payload.volume;
        },
        // Change the parameter of an effect
        changeEffectParam: (
            state,
            action: PayloadAction<{
                effectName: string;
                paramName: string;
                amount: number;
            }>
        ) => {
            // Get the effect we want to modify
            // state.effects = state.effects.map((effect) => {
            //     return effect.displayName === action.payload.effectName
            //         ? { ...track, : action.payload.volume }
            //         : track;
            // });
            // const param = state.effects[action.payload.effectName].params.find(
            //     (_) => _.name === action.payload.paramName
            // );
            // param!.amount = action.payload.amount;
        },
        setBPM: (state, action: PayloadAction<number>) => {
            state.bpm = action.payload;
        },
        switchInstuments: (
            state,
            action: PayloadAction<{
                oldTrack: AvailableTrack;
                newTrack: InUseTrack;
            }>
        ) => {
            // Remove the old track
            state.availableTracks[action.payload.oldTrack.displayName] =
                action.payload.oldTrack;
            delete state.inUseTracks[action.payload.oldTrack.displayName];

            // Add the new track
            state.inUseTracks[action.payload.newTrack.displayName] =
                action.payload.newTrack;
            delete state.availableTracks[action.payload.newTrack.displayName];
        },
        // Import state from JSON
        importStateFromJSON: (
            state,
            action: PayloadAction<DrumMachineState>
        ) => {
            state.inUseTracks = action.payload.inUseTracks;
            state.bpm = action.payload.bpm;
            state.availableTracks = action.payload.availableTracks;
        },
        /*  REMOVING THIS FOR NOW
        // Add a new track to the machine
        addEffect: (state, action: PayloadAction<InUseEffect>) => {
            state.inUseEffects = [...state.inUseEffects, action.payload];
            state.availableEffects = state.availableEffects.filter(
                (_) => _.displayName !== action.payload.displayName
            );
        },
        // Remove an existing track from the machine
        removeEffect: (state, action: PayloadAction<InUseEffect>) => {
            state.availableEffects = [
                ...state.availableEffects,
                action.payload,
            ];
            state.inUseEffects = state.inUseEffects.filter(
                (_) => _.displayName !== action.payload.displayName
            );
        },
        */
    },
});

export type RPDispatch = React.Dispatch<ActionFromReducer<typeof reducer>>;
export const { reducer, actions } = drumMachineStateSlice;
