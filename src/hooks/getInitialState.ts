import { DrumMachineState, AvailableTrack } from "../Types";
import { convertArrayToRecord } from "../utils/DataStructureUtils";

const allTracks = [
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
];

const allEffects = [
    {
        displayName: "Reverb",
        params: [
            { name: "wet-dry", amount: 0, min: 0, max: 1 },
            { name: "decay", amount: 1, min: 1, max: 1000 },
        ],
    },
];

export const getInitialState = (): DrumMachineState => {
    return {
        inUseTracks: {},
        availableTracks: convertArrayToRecord(allTracks, "displayName"),
        // effects: convertArrayToRecord(allEffects, "displayName"),
        bpm: 120,
    };
};
