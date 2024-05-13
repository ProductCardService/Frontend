import React, {useState} from "react";
import "./create-card.css";
import Heading from "../../ui/heading/heading.tsx";
import Paragraph from "../../ui/paragraph/paragraph.tsx";
import {Button, ButtonType} from "../../ui/button/button.tsx";
import Tag from "../../ui/tag/tag.tsx";
import Switch from "../switch/switch.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ReactComponent as Logo } from './../../assets/regenerate.svg';
import Input from "../../ui/input/input.tsx";

interface CreateCardProps{
    title: string,
    description: string,
    descriptionVariant: number,
    setDescriptionVariant: (variant: number) => void,
    imageVariant: number,
    setImageVariant: (variant: number) => void,
    tags: Array<string>,
    removeTag: (tag: string) => void,
    addTag: (tag: string) => void,
    image: string,
    saveCard: () => void,
    exit: () => void,
    regenerateImages: () => void,
    regenerateDescriptions: () => void,
    regenerateTags: () => void,
    regenerateAll: () => void,
    isFirstDescriptionOnly: boolean
    isFirstImageOnly: boolean
}
const CreateCard: React.FC<CreateCardProps> = (props) => {
    const {
        title, saveCard, exit, description, descriptionVariant, setDescriptionVariant,
        imageVariant, setImageVariant, image, tags, removeTag, addTag,
        regenerateImages, regenerateDescriptions, regenerateTags, regenerateAll,
        isFirstDescriptionOnly, isFirstImageOnly
    } = props;
    const [newTag, setNewTag] = useState<string>("");

    return(
        <div className="card">
            <div className="card__image" style={{backgroundImage: `url(${image})`}}>
            </div>
            <div className="card__body">
                <Switch currentVariant={imageVariant} setVariant={setImageVariant} regenerate={regenerateImages} isFirstOnly={isFirstImageOnly}/>
                <Heading title={title} />
                <div className="card__content">
                    <Paragraph text={description}/>
                    <Switch currentVariant={descriptionVariant} setVariant={setDescriptionVariant} regenerate={regenerateDescriptions} isFirstOnly={isFirstDescriptionOnly}/>
                    <div className="card__tags-container">
                        <div className="card__tags-items">
                            <Input
                                type="text"
                                style={{width: "50%"}}
                                value={newTag}
                                placeholder="Новый тег"
                                onChange={e => setNewTag(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && e.currentTarget.value !== "") {
                                        e.preventDefault();
                                        addTag(e.currentTarget.value);
                                        setNewTag("");
                                    }
                                }}
                            />
                            {
                                tags.map((tag) => (
                                    <Tag key={tag} title={tag} removable={true} onClick={() => removeTag(tag)}/>
                                ))
                            }
                        </div>
                        <button onClick={regenerateTags}>
                            <Logo/>
                        </button>
                    </div>
                    <Heading title={"Нутриенты"} />
                    <Paragraph text={"Информация по нутриентам"}/>
                </div>
                <div className="card__buttons">
                    <Button title={"Сохранить"} buttonType={ButtonType.FillBlue} onClick={saveCard}/>
                    <Button title={"Генерация"} buttonType={ButtonType.OutlineBlue} onClick={regenerateAll}/>
                    <Button title={"🚪"} buttonType={ButtonType.OutlineBlue} onClick={exit}/>
                </div>
            </div>
        </div>
    )
}

export default CreateCard;