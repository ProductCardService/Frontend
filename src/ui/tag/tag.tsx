import "./tag.css";
import React from "react";

interface TagProps{
    title: string,
    onClick?: () => void
}

const Tag: React.FC<TagProps> = (props) => {
    const {title, onClick = () => null} = props;
    return (
        <div className="tag" onClick={onClick}>
            <span className="tag__circle"></span>
            <span className="tag__text">
                {title}
            </span>
        </div>
    )
}
export default Tag;
