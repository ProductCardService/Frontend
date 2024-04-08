import {cardAxios} from "../axios.ts";
import {CreateUpdateCard, Card, CardList, FullCard, CardImage} from '../schemas/cards.ts.ts';
import {AxiosError} from "axios";
import {mockDescriptions, mockImages, mockTags} from "../../mockData.ts";

const CARDS_URL = "/cards";
const CARD_WITH_ID_URL = "/cards/";
const IMAGE_FOR_CARD_URL = (card_id: number) => `/cards/${card_id}/image`;

const createCard = async (card: CreateUpdateCard): Promise<Card> => {
    try{
        const response = await cardAxios.post(
            CARDS_URL,
            card
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                id: 1,
                title: card.title,
                description: card.description,
                tags: card.tags
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const getCards = async (): Promise<CardList> => {
    try{
        const response = await cardAxios.get(
            CARDS_URL
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                cards: [
                    {
                        id: 1,
                        title: "Борщ",
                        description: mockDescriptions[0],
                        tags: mockTags
                    },
                    {
                        id: 2,
                        title: "Борщ 2",
                        description: mockDescriptions[1],
                        tags: mockTags
                    }
                ]
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const getCardById = async (cardId: number): Promise<FullCard> => {
    try{
        const response = await cardAxios.get(
            CARD_WITH_ID_URL + cardId.toString()
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                id: 1,
                title: "Борщ",
                description: mockDescriptions[0],
                tags: mockTags,
                image: mockImages[0]
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const updateCardById = async (cardId: number, card: CreateUpdateCard): Promise<Card> => {
    try{
        const response = await cardAxios.put(
            CARD_WITH_ID_URL + cardId.toString(),
            card
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                id: cardId,
                title: card.title,
                description: card.description,
                tags: card.tags,
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const deleteCardById = async (cardId: number): Promise<void> => {
    try{
        await cardAxios.delete(
            CARD_WITH_ID_URL + cardId.toString()
        );
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return;
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const getCardImageById = async (cardId: number): Promise<CardImage> => {
    try{
        const response = await cardAxios.get(
            IMAGE_FOR_CARD_URL(cardId)
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                image: mockImages[0]
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}


export {createCard, getCards, getCardById, updateCardById, deleteCardById, getCardImageById};
