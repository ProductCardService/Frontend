import "./input.css";
import React, {ChangeEvent} from "react";

interface InputProps{
    placeholder: string,
    type?: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Input: React.FC<InputProps> = (props) => {
    const {placeholder, type="text", value, onChange} = props;
    return (
        <input className="input" type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    )
}
export default Input;
