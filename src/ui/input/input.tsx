import "./input.css";
import React, {ChangeEvent, KeyboardEvent} from "react";

interface InputProps{
    style?: React.CSSProperties;
    placeholder: string,
    type?: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
}

const Input: React.FC<InputProps> = (props) => {
    const {placeholder, type="text", value, style = {}, onChange, onKeyDown = () => null} = props;
    return (
        <input className="input" style={style} type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
    )
}
export default Input;
