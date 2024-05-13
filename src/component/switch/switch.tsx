import "./switch.css";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ReactComponent as Logo } from './../../assets/regenerate.svg';

interface SwitchProps{
    currentVariant: number,
    setVariant: (variant: number) => void,
    regenerate: () => void,
    isFirstOnly: boolean
}

const Switch: React.FC<SwitchProps> = (props) => {
    const {currentVariant, setVariant, regenerate, isFirstOnly} = props;
    const setVariantWithChecking = (variant: number) => {
        if (!isFirstOnly){
            setVariant(variant);
        }
    }
    return (
        <div className="switches">
            <div className="switches__items">
                {
                    [0, 1, 2, 3].map(variant => (
                        <span
                            key={variant}
                            className={
                                isFirstOnly && variant !== currentVariant
                                ? "switch switch_disabled"
                                : variant === currentVariant
                                        ? "switch switch_active"
                                        : "switch"
                            }
                            onClick={() =>  setVariantWithChecking(variant)}
                        >
                            {`вар ${variant + 1}`}
                        </span>
                    ))
                }
            </div>
            <button onClick={regenerate}>
                <Logo/>
            </button>
        </div>
    )
}
export default Switch;
