import Card from "../component/card/card.tsx";
import NewCard from "../component/new-card/new-card.tsx";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {FullCard} from "../api/schemas/cards.ts.ts";
import {deleteCardById, getCards} from "../api/routers/cards.ts";
import EmptyCard from "../component/card/empty-card.tsx";

const CardListPage = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<Array<FullCard>>([]);
    const [isCardsLoading, setIsCardsLoading] = useState(true);
    useEffect(() => {
        getCards()
            .then(cardList => {
                setCards(cardList.cards.map(card => ({...card, image: ""})));
                setIsCardsLoading(false);
            })
    }, []);

    const createCard = (title: string) => {
        navigate(`/create?title=${title}`);
    }
    const editCard = (cardId: number) => {
        navigate(`/edit/${cardId}`);
    }
    const deleteCard = (cardId: number) => {
        deleteCardById(cardId)
        .then(() => {
            setCards(cards.filter(card => card.id !== cardId));
        })
    }

    return(
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: "24px", rowGap: "24px", padding: "76px 80px 0"}}>
            <NewCard createCard={createCard}/>
            {
                isCardsLoading && <EmptyCard/>
            }
            {
                !isCardsLoading &&
                cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        tags={card.tags}
                        editCard={() => editCard(card.id) }
                        deleteCard={() => deleteCard(card.id)}
                    />
                ))
            }
        </div>
    )
}

export default CardListPage;