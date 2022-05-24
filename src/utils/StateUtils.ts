import { AvailableTrack, DrumMachineState, Effect, InUseTrack } from "../Types";

type GetStateItemByProperty = {
    stateProp: "inUseTracks" | "availableTracks" | "effects";
    itemPropName: string;
    itemPropVal: any;
    state: DrumMachineState;
};

export const getFirstAvailableItemByProperty = ({
    stateProp,
    itemPropName,
    itemPropVal,
    state,
}: GetStateItemByProperty) => {
    return Object.values(state[stateProp]).filter(
        (item: AvailableTrack | InUseTrack | Effect) =>
            item[itemPropName] === itemPropVal
    )[0];
};
