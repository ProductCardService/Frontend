import React from "react";
import "./card.css";
import Heading from "../../ui/heading/heading.tsx";
import Paragraph from "../../ui/paragraph/paragraph.tsx";
import {Button, ButtonType} from "../../ui/button/button.tsx";
import Tag from "../../ui/tag/tag.tsx";

interface CardProps{
    title: string,
    description: string,
    tags: Array<string>,
    image: string,
    editCard: () => void
}
const Card: React.FC<CardProps> = (props) => {
    const {title, description, image, tags, editCard} = props;
    return(
        <div className="card">
            <div className="card__image" style={{backgroundImage: `url(${image})`}}>
            </div>
            <div className="card__body">
                <Heading title={title} />
                <div className="card__content">
                    <Paragraph text={description}/>
                    <div className="card__tags">
                        {
                            tags.map(tag => (
                                <Tag key={tag} title={tag}/>
                            ))
                        }
                    </div>
                    <Heading title={"Нутриенты"} />
                    <Paragraph text={"Сюда подтягивается инфо по нутриентам"}/>
                </div>
                <div className="card__buttons">
                    <Button title={"Редактировать карточку"} buttonType={ButtonType.OutlineGrey} onClick={editCard}/>
                </div>
            </div>
        </div>
    )
}

export default Card;