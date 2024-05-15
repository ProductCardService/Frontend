import {useSearchParams, useNavigate, useLocation, useParams} from 'react-router-dom';
import CreateCard from "../component/create-card/create-card.tsx";
import {useEffect, useState} from "react";
import {generateImages, generateDescriptions, generateTags} from "../api/routers/ai.ts";
import {createCard, getCardById, updateCardById} from "../api/routers/cards.ts";
import {toast} from "react-toastify";

const CreateCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParam, ] = useSearchParams({title: ""});
    const params = useParams();
    const cardId = params.cardId
    const isCreateMode = location.pathname.startsWith("/create");
    const isEditMode = location.pathname.startsWith("/edit");

    const [descriptions, setDescriptions] = useState<Array<string>>(["", "", "", ""]);
    const [descriptionsLoading, setDescriptionsLoading] = useState(true);
    const [images, setImages] = useState<Array<string>>(["", "", "", ""]);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [tags, setTags] = useState<Array<string>>([]);
    const [tagsLoading, setTagsLoading] = useState(true);
    const [title, setTitle] = useState<string>("");
    const [descriptionVariant, setDescriptionVariant] = useState(0);
    const [imageVariant, setImageVariant] = useState(0);
    const [isFirstDescriptionOnly, setIsFirstDescriptionOnly] = useState(true);
    const [isFirstImageOnly, setIsFirstImageOnly] = useState(true);

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
                setImagesLoading(false);
                setDescriptionsLoading(false);
                setTagsLoading(false);
            })
        } else {
            const titleFromParam = searchParam.get("title") || ""
            const titleData = {title: titleFromParam}
            Promise.allSettled([generateImages(titleData), generateDescriptions(titleData), generateTags(titleData)])
                .then(res => {
                    if (res[0].status ===  "fulfilled"){
                        setImages(res[0].value.images);
                    }
                    if (res[1].status ===  "fulfilled"){
                        setDescriptions(res[1].value.descriptions);
                    }
                    if (res[2].status ===  "fulfilled"){
                        setTags(res[2].value.tags);
                    }
                })
            .catch(reason => {
                toast.error(reason.toString())
            })
            .finally(() => {
                setDescriptionVariant(0);
                setImageVariant(0);
                setIsFirstDescriptionOnly(false);
                setIsFirstImageOnly(false);
                setImagesLoading(false);
                setDescriptionsLoading(false);
                setTagsLoading(false);
            })
        }
    }, [isCreateMode, searchParam, isEditMode, cardId, navigate]);


    const regenerateImages = async () => {
        if (!imagesLoading){
            setImagesLoading(true)
            generateImages({title: title})
                .then(data => {
                    setImages(data.images);
                    toast.success("Генерация изображений завершена")
                })
                .catch(reason => {
                    toast.error(reason.toString());
                })
                .finally(() => {
                    setImagesLoading(false);
                    setImageVariant(0);
                    setIsFirstImageOnly(false);
                })
        } else {
            toast.warning("Пожалуйста дождитесь окончания текущей генерации изображений")
        }
    }
    const regenerateDescriptions = async () => {
        if (!descriptionsLoading){
            setDescriptionsLoading(true)
            generateDescriptions({title: title})
                .then(data => {
                    setDescriptions(data.descriptions);
                    toast.success("Генерация описаний завершена");
                })
                .catch(reason => {
                    toast.error(reason.toString());
                })
                .finally(() => {
                    setDescriptionsLoading(false);
                    setDescriptionVariant(0);
                    setIsFirstDescriptionOnly(false);
                })
        } else {
            toast.warning("Пожалуйста дождитесь окончания текущей генерации описаний")
        }
    }
    const regenerateTags = async () => {
        if (!tagsLoading){
            setTagsLoading(true)
            generateTags({title: title})
                .then(data => {
                    setTags(data.tags);
                    toast.success("Генерация тегов завершена")
                })
                .catch(reason => {
                    toast.error(reason.toString());
                })
                .finally(() => {
                    setTagsLoading(false)
                })
        } else {
            toast.warning("Пожалуйста дождитесь окончания текущей генерации тэгов")
        }
    }

    const regenerateAll = () => {
        if (!tagsLoading && !imagesLoading && !descriptionsLoading){
            setImagesLoading(true)
            setDescriptionsLoading(true)
            setTagsLoading(true)
            const titleData = {title: title}
            Promise.allSettled([generateImages(titleData), generateDescriptions(titleData), generateTags(titleData)])
                .then(res => {
                    if (res[0].status ===  "fulfilled"){
                        setImages(res[0].value.images);
                    }
                    if (res[1].status ===  "fulfilled"){
                        setDescriptions(res[1].value.descriptions);
                    }
                    if (res[2].status ===  "fulfilled"){
                        setTags(res[2].value.tags);
                    }
                })
                .catch(reason => {
                    toast.error(reason.toString())
                })
                .finally(() => {
                    setDescriptionVariant(0);
                    setImageVariant(0);
                    setIsFirstDescriptionOnly(false);
                    setIsFirstImageOnly(false);
                    setImagesLoading(false);
                    setDescriptionsLoading(false);
                    setTagsLoading(false);
                })
        } else if (tagsLoading && imagesLoading && descriptionsLoading){
            toast.warning("Пожалуйста дождитесь окончания генерации карточки")
        }
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
                regenerateAll={regenerateAll}
                removeTag={removeTag}
                addTag={addTag}
                isFirstDescriptionOnly={isFirstDescriptionOnly}
                isFirstImageOnly={isFirstImageOnly}
                descriptionsLoading={descriptionsLoading}
                imagesLoading={imagesLoading}
                tagsLoading={tagsLoading}
            />
        </div>
    )
}

export default CreateCardPage;