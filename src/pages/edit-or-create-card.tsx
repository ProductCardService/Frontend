import {useSearchParams, useNavigate, useLocation, useParams} from 'react-router-dom';
import CreateCard from "../component/create-card/create-card.tsx";
import {useEffect, useState} from "react";
import {generateImages, generateDescriptions, generateTags} from "../api/routers/ai.ts";
import {createCard, getCardById, updateCardById} from "../api/routers/cards.ts";

const CreateCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParam, ] = useSearchParams();
    const params = useParams();
    const cardId = params.cardId
    const isCreateMode = location.pathname.startsWith("/create");
    const isEditMode = location.pathname.startsWith("/edit");

    const [descriptions, setDescriptions] = useState<Array<string>>(["", "", "", ""])
    const [images, setImages] = useState<Array<string>>(["", "", "", ""])
    const [tags, setTags] = useState<Array<string>>([])
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        if (isCreateMode && !searchParam.has("title")){
            navigate("/");
        } else if (isEditMode && cardId === undefined){
            navigate("/");
        }
        if (isCreateMode){
            const titleFromParam = searchParam.get("title") || ""
            setTitle(titleFromParam)
        }
        if (isEditMode){
            getCardById(Number(cardId))
            .then(card => {
                setTitle(card.title)
                setDescriptions([card.description, "", "", ""]);
                setImages([card.image, "", "", ""]);
                setTags(card.tags);
            })
        }
    }, [isCreateMode, searchParam, isEditMode, cardId, navigate]);

    const regenerateImages = async () => {
        const data = await generateImages({title: title});
        setImages(data.images)
    }
    const regenerateDescriptions = async () => {
        const data = await generateDescriptions({title: title});
        setDescriptions(data.descriptions)
    }
    const regenerateTags = async () => {
        const data = await generateTags({title: title});
        setTags(data.tags)
    }

    const saveOrEditCard = async () => {
        if (isCreateMode){
            await createCard({
                title: title,
                image: images[imageVariant],
                description: descriptions[descriptionVariant],
                tags: tags
            });
        }
        if (isEditMode){
            await updateCardById(Number(cardId), {
                title: title,
                image: images[imageVariant],
                description: descriptions[descriptionVariant],
                tags: tags
            });
        }
        navigate("/");
    }

    const returnToCardListPage = () => {
        navigate("/");
    }

    const [descriptionVariant, setDescriptionVariant] = useState(0);
    const [imageVariant, setImageVariant] = useState(0);
    const removeTag = (tag: string) => {
        setTags(tags.filter(currentTag => currentTag !== tag))
    }
    const addTag = (tag: string) => {
        setTags([...tags, tag]);
    }

    return(
        <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <CreateCard
                title={title}
                description={descriptions[descriptionVariant]}
                descriptionVariant={descriptionVariant}
                setDescriptionVariant={setDescriptionVariant}
                imageVariant={imageVariant}
                setImageVariant={setImageVariant}
                tags={tags}
                image={images[imageVariant]}
                saveCard={saveOrEditCard}
                exit={returnToCardListPage}
                regenerateImages={regenerateImages}
                regenerateDescriptions={regenerateDescriptions}
                regenerateTags={regenerateTags}
                removeTag={removeTag}
                addTag={addTag}
            />
        </div>
    )
}

export default CreateCardPage;