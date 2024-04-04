import "./heading.css";
import React from "react";

interface HeadingProps{
    title: string,
}

const Heading: React.FC<HeadingProps> = (props) => {
    const {title} = props;
    return (
        <p className="heading">
            {title}
        </p>
    )
}
export default Heading;
