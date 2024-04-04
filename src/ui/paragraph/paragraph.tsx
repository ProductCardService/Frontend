import "./paragraph.css";
import React from "react";

interface ParagraphProps{
    text: string,
}

const Paragraph: React.FC<ParagraphProps> = (props) => {
    const {text} = props;
    return (
        <p className="paragraph">
            {text}
        </p>
    )
}
export default Paragraph;
