import "./tag.css";
import React from "react";

interface TagProps{
    title: string,
}

const Tag: React.FC<TagProps> = (props) => {
    const {title} = props;
    return (
        <div className="tag">
            <span className="tag__circle"></span>
            <span className="tag__text">
                {title}
            </span>
        </div>
    )
}
export default Tag;
