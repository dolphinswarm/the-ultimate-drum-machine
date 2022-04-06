import React from "react";
import { DrumMachineState, Effect, EffectParamType } from "../Types";
import { Knob } from "react-rotary-knob";

type EffectsContainerProps = {
    state: DrumMachineState;
    currentBeat: number;
    isPlaying: boolean;
    changeEffectParam: (
        effectName: string,
        paramName: string,
        amount: number
    ) => void;
};

const EffectsContainer = ({
    state,
    currentBeat,
    isPlaying,
    changeEffectParam,
}: EffectsContainerProps) => {
    const getPrettyEffectName = (paramName: EffectParamType) => {
        switch (paramName) {
            case "decay":
            case "frequency":
                return paramName.charAt(0).toUpperCase() + paramName.slice(1);
            case "wet-dry":
                return "Wet/Dry";
            case "lfo-speed":
                return "LFO Speed";
            default:
                throw new Error("U DUN FUCKED UP SON");
        }
    };

    return (
        <>
            {/* Effects Container */}
            <div id="effects-container">
                {state.effects.map((effect) => (
                    <div key={effect.displayName} className="effect">
                        {/* Effect Title */}
                        <div className="effect-title">
                            <span className="effect-maintext">
                                {effect.displayName}
                            </span>
                        </div>
                        <div className="effect-controls">
                            {effect.params.map((param) => (
                                <span>
                                    <label
                                        htmlFor={`${effect.displayName}-${param.name}`}
                                    >
                                        {getPrettyEffectName(param.name)}
                                    </label>
                                    <br />
                                    <Knob
                                        min={param.min}
                                        max={param.max}
                                        unlockDistance={0}
                                        preciseMode={false}
                                        name={`${effect.displayName}-${param.name}`}
                                        style={{ display: "inline-block" }}
                                        onChange={(amount) =>
                                            changeEffectParam(
                                                effect.displayName,
                                                param.name,
                                                amount
                                            )
                                        }
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        disabled
                                        value={param.amount.toFixed(2)}
                                        className="effect-label"
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EffectsContainer;
