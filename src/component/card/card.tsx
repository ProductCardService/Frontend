import React, {useEffect, useState} from "react";
import "./card.css";
import Heading from "../../ui/heading/heading.tsx";
import Paragraph from "../../ui/paragraph/paragraph.tsx";
import {Button, ButtonType} from "../../ui/button/button.tsx";
import Tag from "../../ui/tag/tag.tsx";
import {getCardImageById} from "../../api/routers/cards.ts";
import Skeleton from "react-loading-skeleton";

interface CardProps{
    id: number,
    title: string,
    description: string,
    tags: Array<string>,
    editCard: () => void,
    deleteCard: () => void
}
const Card: React.FC<CardProps> = (props) => {
    const {id, title, description, tags, editCard, deleteCard} = props;
    const [image, setImage] = useState<string>("");
    useEffect(() => {
        getCardImageById(id)
        .then(cardImage => setImage(cardImage.image))
    }, [id]);
    return(
        <div className="card">
            {
                image === ""
                    ? <Skeleton borderRadius="12px 12px 0 0" height="200px" containerClassName="avatar-skeleton"/>
                    : <div className="card__image" style={{backgroundImage: `url(${image})`}}></div>
            }
            <div className="card__body">
                {
                    title !== ""
                        ? <Heading title={title} />
                        : <Skeleton height="23px"/>
                }
                <div className="card__content">
                    {
                        description === ""
                            ? <Skeleton height="100px"/>
                            : <div style={{height: "100px"}}><Paragraph text={description}/></div>
                    }
                    <div className="card__tags">
                        {
                            tags.map(tag => (
                                <Tag key={tag} title={tag}/>
                            ))
                        }
                    </div>
                    <Heading title={"Нутриенты"} />
                    <Paragraph text={"Информация по нутриентам"}/>
                </div>
                <div className="card__buttons">
                    <Button title={"Редактировать"} buttonType={ButtonType.FillBlue} onClick={editCard}/>
                    <Button title={"Удалить"} buttonType={ButtonType.OutlineGrey} onClick={deleteCard}/>
                </div>
            </div>
        </div>
    )
}

export default Card;