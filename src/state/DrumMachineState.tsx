import { AvailableTrack, DrumMachineState, Effect, InUseTrack } from "../Types";
import {
    ActionFromReducer,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { getInitialState } from "../hooks/getInitialState";
import { Effect } from "tone/build/esm/effect/Effect";

const initialState: DrumMachineState = getInitialState();

export const drumMachineStateSlice = createSlice({
    name: "DrumMachineState",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Add a new track to the machine
        addTrack: (state, action: PayloadAction<InUseTrack>) => {
            state.inUseTracks = [...state.inUseTracks, action.payload];
            state.availableTracks = state.availableTracks.filter(
                (_) => _.displayName !== action.payload.displayName
            );
        },
        // Remove an existing track from the machine
        removeTrack: (state, action: PayloadAction<InUseTrack>) => {
            state.availableTracks = [...state.availableTracks, action.payload];
            state.inUseTracks = state.inUseTracks.filter(
                (_) => _.displayName !== action.payload.displayName
            );
        },
        // Toggle a beat on / off
        // (this is handled by the function)
        toggleBeat: (state, action: PayloadAction<InUseTrack>) => {
            state.inUseTracks = state.inUseTracks.map((track) => {
                return track.displayName === action.payload.displayName
                    ? action.payload
                    : track;
            });
        },
        // Reorder / sort the tracks
        // (this is handled by the function)
        reorderInUseTracks: (state, action: PayloadAction<InUseTrack[]>) => {
            state.inUseTracks = action.payload;
        },
        // Change the volume of a track
        changeTrackVolume: (
            state,
            action: PayloadAction<{ trackName: string; volume: number }>
        ) => {
            state.inUseTracks = state.inUseTracks.map((track) => {
                return track.displayName === action.payload.trackName
                    ? { ...track, volume: action.payload.volume }
                    : track;
            });
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
            state.effects = state.effects.map((track) => {
                return track.displayName === action.payload.effectName
                    ? { ...track, volume: action.payload.volume }
                    : track;
            });
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
            // Get the position of the old track and swap it with the new track
            const pos = state.inUseTracks.findIndex(
                (_) => _.displayName === action.payload.oldTrack.displayName
            );
            const tmpArray = state.inUseTracks.slice();
            tmpArray[pos] = action.payload.newTrack;

            // Add the new track to the in-use state and remove the old track
            state.inUseTracks = tmpArray.filter(
                (track) =>
                    track.displayName !== action.payload.oldTrack.displayName
            );

            // Add the old track to the available state and remove the new track
            state.availableTracks = [
                ...state.availableTracks,
                action.payload.oldTrack,
            ].filter(
                (track) =>
                    track.displayName !== action.payload.newTrack.displayName
            );
        },
        // Import state from JSON
        importStateFromJSON: (
            state,
            action: PayloadAction<DrumMachineState>
        ) => {
            state = action.payload;
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
