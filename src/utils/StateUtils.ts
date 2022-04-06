import { DrumMachineState } from "../Types";

type TrackProperty = "displayName" | "category";

export const getInUseTrackByProperty = (
    propName: TrackProperty,
    prop: string,
    state: DrumMachineState
) => {
    return state.inUseTracks.filter((track) => track[propName] === prop)[0];
};

export const getAvailableTrackByProperty = (
    propName: TrackProperty,
    prop: string,
    state: DrumMachineState
) => {
    return state.availableTracks.filter((track) => track[propName] === prop)[0];
};

/* REMOVING THIS FOR NOW
export const getInUseEffectByName = (
    effectName: string,
    state: DrumMachineState
) => {
    return state.inUseEffects.filter(
        (effect) => effect.displayName === effectName
    )[0];
};

export const getAvailableEffectByName = (
    effectName: string,
    state: DrumMachineState
) => {
    return state.availableEffects.filter(
        (effect) => effect.displayName === effectName
    )[0];
};
*/
