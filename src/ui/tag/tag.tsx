import "./tag.css";
import React from "react";

interface TagProps{
    title: string,
    onClick?: () => void,
    removable?: boolean
}

const Tag: React.FC<TagProps> = (props) => {
    const {title, onClick = () => null, removable = false} = props;
    return (
        <div className={removable? "tag tag_removable": "tag"} onClick={onClick} title={removable? "Нажмите для удаления": undefined}>
            <span className="tag__circle">
                <span>&times;</span>
            </span>
            <span className="tag__text">
                {title}
            </span>
        </div>
    )
}
export default Tag;
