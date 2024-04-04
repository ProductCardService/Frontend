import React, {useState} from "react";
import "./new-card.css";
import Heading from "../../ui/heading/heading.tsx";
import {Button, ButtonType} from "../../ui/button/button.tsx";
import Input from "../../ui/input/input.tsx";

interface NewCardProps{
    createCard: (title: string) => void
}
const NewCard: React.FC<NewCardProps> = (props) => {
    const {createCard} = props;
    const [title, setTitle] = useState("");
    const createCardWithCheckingTitle = () => {
        if (title !== ""){
            createCard(title)
        }
        // TODO - add notification and extra validation
    }
    return(
        <div className="new-card">
            <div className="new-card__body">
                <Heading title="Добавить новый продукт" />
                <Input placeholder={"Введите название продукта..."} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Button title={"Перейти к генерации"} buttonType={ButtonType.FillBGrey} onClick={createCardWithCheckingTitle}/>
            </div>
        </div>
    )
}

export default NewCard;