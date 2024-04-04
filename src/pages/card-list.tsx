import Card from "../component/card/card.tsx";
import NewCard from "../component/new-card/new-card.tsx";
import { useNavigate } from "react-router-dom";

const CardListPage = () => {
    const navigate = useNavigate();
    const createCard = (title: string) => {
        navigate(`/create?title=${title}`);
    }
    const editCard = (cardId: number) => {
        navigate(`/edit/${cardId}`);
    }
    return(
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: "24px", rowGap: "24px", padding: "76px 80px 0"}}>
            <NewCard createCard={createCard}/>
            <Card
                title={`Куриный салат`}
                description={'Лапша с курицей - это популярное блюдо, представляющее собой сочетание отварной или жареной курицы с вареной лапшой. Может быть приправлено разнообразными специями и соусами, в зависимости от рецепта и кулинарных традиций.'}
                tags={["Курица", "Салат"]}
                image={'https://worldpodium.ru/sites/default/files/sedlo-barashka_0.jpg'}
                editCard={() => editCard(1) }
            />

        </div>
    )
}

export default CardListPage;