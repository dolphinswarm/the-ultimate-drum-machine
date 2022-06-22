import * as Tone from "tone";

export type InstrumentCategory =
    | "kick"
    | "snare"
    | "hihat"
    | "clap"
    | "fx"
    | "crash"
    | "ride"
    | "tom"
    | "accessory";

export type EffectParamType = "frequency" | "lfo-speed" | "wet-dry" | "decay";

export interface IToneTrack {
    [key: string]: Tone.Player;
}

export interface IToneEffect {
    [key: string]: Tone.Filter | Tone.Reverb;
}

export type AvailableTrack = {
    displayName: string;
    category: InstrumentCategory;
    instrumentLocation: string;
};

export type InUseTrack = AvailableTrack & {
    volume: number;
    beats: number[];
};

type EffectParam = {
    name: EffectParamType;
    amount: number;
    min: number;
    max: number;
};

export type Effect = {
    displayName: string;
    params: EffectParam[];
};

/* REMOVING THIS FOR NOW
export type AvailableEffect = {
    displayName: string;
    category: "simple" | "controlled";
};

export type InUseEffect = AvailableEffect & {
    volume: number;
};
*/

export type DrumMachineState = {
    inUseTracks: Record<string, InUseTrack>;
    availableTracks: Record<string, AvailableTrack>;
    // effects: Record<string, Effect>;
    bpm: number;
    /* REMOVING THIS FOR NOW
    inUseEffects: InUseEffect[];
    availableEffects: AvailableEffect[];
    */
};
