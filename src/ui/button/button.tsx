import "./button.css";
import React from "react";

enum ButtonType {
    FillBlue = "fill-blue-btn",
    OutlineBlue = "outline-blue-btn",
    OutlineGrey = "outline-grey-btn",
}
interface ButtonProps{
    title: string,
    onClick: () => void,
    buttonType: ButtonType
}

const Button: React.FC<ButtonProps> = (props) => {
    const {title, onClick, buttonType} = props;
    return (
        <button
            className={"btn " + buttonType}
            onClick={onClick}
        >
            {title}
        </button>
    )
}
export {Button, ButtonType};
